// storage-adapter-import-placeholder
import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { resendAdapter } from "@payloadcms/email-resend";
import { buildConfig } from "payload";

import { defaultLexical } from "./collections/fields/defaultLexical";
import { Pages } from "./collections/Pages";
// Collections
import { Users } from "./collections/Users";
// Global Collections
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
	collections: [Users, Pages],
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
		defaultFromAddress: "no-reply@TOODEV.com",
		defaultFromName: "TOO DEV",
		apiKey: process.env.RESEND_API_KEY || ""
	})
});
