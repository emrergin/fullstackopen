browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
note over server:
Saves the request body then redirects by
Sending back a hyperlink to /notes 
end note
server-->browser: HTTP 302 Response. Redirects.
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
server-->browser: HTML-code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
server-->browser: main.js

note over browser:
 js-code executes in the browser
and requests JSON data from the server
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{ content: "HTML is hard", date: "2022-06-25" }, ...]

note over browser:
when the request is responded to with
status code 200, the event handler
renders the notes.
end note