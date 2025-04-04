import { GlobalConfig } from "payload";

const SiteOptions: GlobalConfig = {
	slug: "site-options",
	label: "Site Options",
	access: {
		read: () => true
	},
	admin: {
		hidden: ({ user }) => user?.role !== "admin",
		group: "Global Content"
	},
	fields: [
		{
			type: "tabs", // required
			tabs: [
				{
					label: "SEO", // required
					description: "This tab contains all the default SEO content for your build",
					fields: [
						{
							label: "Meta Title",
							name: "meta_title",
							type: "text"
						},
						{
							label: "Meta Description",
							name: "meta_description",
							type: "textarea"
						}
					]
				},
				{
					label: "Header", // required
					description: "This tab contains all the default Header content for your build",
					fields: []
				},
				{
					label: "Footer", // required
					description: "This tab contains all the default Footer content for your build",
					fields: []
				},
				{
					label: "Wedding Day", // required
					description: "This tab contains all the core information for wedding details",
					fields: [
						{
							name: "wedding_date",
							label: "Wedding Date",
							type: "date"
						}
					]
				},
				{
					label: "Lock Screen", // required
					description: "This tab contains all information for details when lock screen is active",
					fields: [
						{
							name: "password",
							label: "Password",
							type: "text"
						},
						{
							name: "lockscreen_bg",
							label: "Lockscreen Background",
							type: "upload",
							relationTo: "media"
						}
					]
				}
			]
		}
	]
};

export default SiteOptions;
