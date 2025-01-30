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
		}
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
