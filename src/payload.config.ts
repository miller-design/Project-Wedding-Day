// storage-adapter-import-placeholder
import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { resendAdapter } from "@payloadcms/email-resend";
import { uploadthingStorage } from "@payloadcms/storage-uploadthing";
import { buildConfig } from "payload";
import sharp from "sharp";

import { defaultLexical } from "./collections/fields/defaultLexical";
import { FormSubmissions } from "./collections/FormSubmissions";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Users } from "./collections/Users";
import SiteOptions from "./globals/siteOptions";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Enables Postgres row-level security on every table in a Drizzle schema.
 * Payload uses the postgres role (BYPASSRLS), so admin/API capabilities stay unchanged.
 * This stops Supabase Data API (anon/authenticated) open access and survives Drizzle push.
 *
 * @param schema - Drizzle schema object from postgresAdapter `afterSchemaInit`
 * @returns The same schema after RLS flags are set on each table
 * @example
 * afterSchemaInit: [
 *   ({ schema }) => enableRlsOnSchemaTables(schema)
 * ]
 */
function enableRlsOnSchemaTables<
	TSchema extends {
		tables: Record<string, { enableRLS: () => unknown }>
	}
>(schema: TSchema): TSchema {
	for (const table of Object.values(schema.tables)) {
		table.enableRLS()
	}

	return schema
}

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname)
		}
	},
	collections: [Users, Pages, Media, FormSubmissions],
	globals: [SiteOptions],
	editor: defaultLexical,
	secret: process.env.PAYLOAD_SECRET || "",
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts")
	},
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI || ""
		},
		afterSchemaInit: [
			({ schema }) => enableRlsOnSchemaTables(schema)
		]
	}),
	email: resendAdapter({
		defaultFromAddress: "noreply@jp-wedding.day",
		defaultFromName: "Jack & Paige",
		apiKey: process.env.RESEND_API_KEY || ""
	}),
	plugins: [
		uploadthingStorage({
			collections: {
				media: true
			},
			options: {
				token: process.env.UPLOADTHING_TOKEN,
				acl: "public-read"
			}
		})
	],
	sharp
});
