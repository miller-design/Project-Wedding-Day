import type { CollectionConfig } from "payload";

export const FormSubmissions: CollectionConfig = {
	slug: "form_submissions",
	labels: {
		plural: "Submissions",
		singular: "Submission"
	},
	admin: {
		useAsTitle: "firstName",
		defaultColumns: ["firstName", "lastName", "email", "weddingAttendance"],
		group: "RSVP's"
	},
	access: {
		read: () => true,
		create: () => true
	},
	fields: [
		{
			type: "row",
			fields: [
				{
					name: "firstName",
					label: "First Name",
					type: "text",
					admin: {
						readOnly: true
					}
				},
				{
					name: "lastName",
					label: "Last Name",
					type: "text",
					admin: {
						readOnly: true
					}
				}
			]
		},
		{
			name: "email",
			label: "Email Address",
			type: "text",
			admin: {
				readOnly: true
			}
		},
		{
			name: "phone",
			label: "Phone Number",
			type: "text",
			admin: {
				readOnly: true
			}
		},
		{
			type: "row",
			fields: [
				{
					name: "weddingAttendance",
					label: "Wedding Attendance",
					type: "text",
					admin: {
						readOnly: true
					}
				},
				{
					name: "ukReceptionAttendance",
					label: "Reception Attendance",
					type: "text",
					admin: {
						readOnly: true
					}
				}
			]
		},
		{
			name: "dietryRequirements",
			label: "Dietary Requirements",
			type: "text",
			admin: {
				readOnly: true
			}
		},
		{
			name: "message",
			label: "Notes",
			type: "textarea",
			admin: {
				readOnly: true
			}
		}
	]
};
