# Resume Builder

This plugin is for anyone to create their own simple CV easily without the hassle of formatting page border, margins and layouts.
Users can export the file as a PDF once they are done.

## Setup

Requirements: Node 20+, Docker (for wp-env).

```
npm install -g @wordpress/env
wp-env start
```

Open http://localhost:8888/wp-admin (admin / password). The plugin is activated automatically.
Add the `[resume_builder]` shortcode to any page and view it while logged in.

The compiled `build/` folder is committed, so the plugin works without a Node build.
To change the front end:

```
npm install
npm run build      # or npm start while developing
```

### Troubleshooting

The DNS issue:
- The error: During setup, the wordpress environment didn't work as expected. It couldn't find the current wordpress version
in the cache since the network was not available. Without it, I would have had to manually install the wordpress files and setup the file paths in my local system.
- what caused it: When running the wp-env command, it decided that I was offline when dns.resolve('Wordpress.org') failed, and that call failed on my machine.
- The fix: I tried changing the network adapter’s DNS, but it didn’t fix it. What fixed the issue was the dns-fix.js file calling require ('dns').setServers( [ '1.1.1.1', '8.8.8.8' ] ), loaded with $env:NODE_OPTIONS="--require <path>". 

## Data model
Reasons for choosing:
1. Posts are private to each user.
2. Owner is the post author who created it.
3. One user can have multiple resumes.
4. The Post: The whole resume stored as one sanitised meta value, _resbuild_content.
5. one read and one write per resume
6. saving is atomic
7. reordering is just array order.

The trade-off: 
1. Can’t search inside resumes.
2. Searchable resumes would need separate post meta per field, or a custom table.


FILE STRUCTURE OF RESUME

{
    "title":"Software Engineer CV 1",
    "content":{
        "personal":{
            "firstName":
            "lastName":
            "phone":
	    "email":
            "linkedin":
            "github":},
 "sections": [
            {
                "id":,
                "type":"education",
                "items":[
                    {
                    "id":
                    "institution":
                    "qualification":
                    "grade":
                    "location":
                    "startDate":
                    "endDate":},
		],},
            {
                "id":,
                "type":"experience",
                "items":[
                    {
                    "id":.....
		],
	    },
	    {
                "id":,
                "type":"awards",
                "items":[
                    {
                    	id":
                        "awardName":
                        "organization":
                        "dateReceived":
                        "bullets":[]
		],
	    },
]


## REST API

Namespace: `resbuild/v1`

1. GET: /resbuild/v1/resumes <- List the current user's resumes.
 - SUCCESS RESPONSE: 200, with an array of resumes
 - FAILURE RESPONSE: 401, requires authentication to view a particular user’s resumes.
 - WHO MAY CALL IT: Logged-in user or an admin. Check: user is logged in, get all resumes with user id.

2. POST: /resbuild/v1/resumes <- Create a resume with current user's account.
- SUCCESS RESPONSE: 201, new resume has been created
- FAILURE RESPONSE: 400: missing title or content not being an object.
- FAILURE RESPONSE: 401: Not logged in
- WHO MAY CALL IT: Logged-in user, OR an admin. Check: if logged in. Later, the current user is set to owner.

3. GET: /resbuild/v1/resumes/{id} <- Read one user's resume
- SUCCESS RESPONSE: 200 with the resume object: id, title, content, modified
- FAILURE RESPONSE: 401 not logged in;
- FAILURE RESPONSE: 403 logged in but not the owner;
- FAILURE RESPONSE: 404 no such post, or it isn’t a resbuild_resume
- WHO MAY CALL IT: Logged-in owner of that resume, or an admin. Check: the current user is the owner, or an admin

4. PUT: /resbuild/v1/resumes/{id} <- update the resume from the current user
- SUCCESS RESPONSE: 200 with the updated resume object
- FAILURE RESPONSE: 400, empty title
- FAILURE RESPONSE: 401 not logged in;
- FAILURE RESPONSE: 403 logged in but not the owner,
- FAILURE RESPONSE: 404, no such post
- WHO MAY CALL IT: Logged-in owner of that resume, or an admin Check: the current user is the owner, or an admin

5. DELETE: /resbuild/v1/resumes/{id} <- Delete one resume from the user's account.
- SUCCESS RESPONSE 200: {"id":8, "deleted”:true} This is moved to permanent delete
- FAILURE RESPONSE: 401 not logged in; 403 Logged in but not the owner; 404 no such post, or it isn’t a resbuild_resume
- WHO MAY CALL IT: Logged-in owner of that resume, or an admin. Check if the current user is the owner, or an admin Permissions: login, owner, or edit_others_posts. 

## Security

1. Sanitisation of Input Fields: It is important to make sure that any data entered in to website is clean, readable and doesn't cause any errors. By sanitising by each field by kind we can drop unknown fields and section types. Eg: validate_callback on title.
2. Requests are sanitised and validated on the way in; escaping (and wp_kses_post) applies to output.The nonce is attached automatically by
@wordpress/api-fetch, which is what makes cookie authentication work.
3. The private post type - setting the posts as private reduces the front-end and API exposure to outside threats/
4. The server rule that clears endDate for current roles - This is mainly for preventing other types of inputs being entered in the field.


BAD INPUT                                         		RESULT
Unknown section type (hobbies, personal)		Section dropped
Unknown field (salary), extra top-level key (admin)		Removed
<script> in a job title						Stripped
Dates like Feb 2023 or 2023-13					Blanked
"current": "false"						false
Invalid email							Blanked
Non-string bullet (42)						Removed	
current true with an end date					End date cleared


| Request                        | admin | bob (owner) | carol | logged out |
| ------------------------------ | ----- | ----------- | ----- | ---------- |
| GET / PUT / DELETE bob's resume | 200   | 200         | 403   | 401        |
| GET a non-resume post          | 404   | —           | —     | —          |
| POST with empty title          | —     | 400         | —     | —          |

## Front end

1. The main REACT Component structures are as follows: 
- App - The main component where the plugin renders.
- ResumeList - Resumes being displayed on the list format 
- ResumeEditor - When in editor mode, the values will appear in fields from which we can edit the values.
- SectionEditor - This is for editing the values in sections (awards, education and experience). Since multiple rows of information can be added, it required a separate component. 
- FieldInput - This component is for displaying each input fields according to the type of value it already has or taking in the new values and sending it to be saved.
- ResumePreview - The box that appears when the users want to see the "document" version of their CV before exporting it to PDF.

2. Other utilities function
 - moveItem - Moving the above mentioned section up and down. Users can change the given order of the sections based on their preferences and importance.
- createId - It makes IDs for sections and items. resumes use the WordPress post ID.  
- Print-only stylesheet + window.print() - The browser’s “Save as PDF” function can be used.



## Extensibility

`resbuild_login_message` filters the HTML shown to logged-out visitors in place of the resume builder.
The result is passed through `wp_kses_post()`, so a filter can't inject unsafe markup.


## Uninstall

It deletes every resume from every user (all resbuild_resume posts and their meta), and it doesn’t touch user accounts.

## Tests

```
npm run test:unit
```
moveItem tests guard - Check if the sections get ordered, stored in the array and if the original data is affected.
ResumeList tests guard - checked if the resumes were loaded correctly, rendering the CVs and if the Edit function worked. 
The REST permissions tests - They were tested manually with curl: with the table of users against expected codes.

## With more time

With more time, a lot more could have improved:
- Drag-and-drop feature
- PHPUnit implementation for permissions 
- Editor styling : editing each part of the CV more creatively and easily.
- Caching
- Item reordering, 
- the PDF export function could have been more sophisticated
- The layout of the input fields could have been made more user friendly.
- The toolchain audit warnings
- To make it more easily accessible, I'd make the resumes with separate class, create fields and meta fields that make the documents searchable through the website.

## How I worked

I used an AI assistant (Claude) throughout as a tutor and code reviewer. I planned the data model, REST API and permissions myself, wrote the PHP, and tested every route and
the sanitiser by hand (see the tables above). For the React side, which was new to me, I learned from worked examples the assistant provided, and some components
(FieldInput, SectionEditor, ResumeList and parts of ResumePreview) closely follow those examples. I reviewed and tested every change, and can walk through any part of the code.