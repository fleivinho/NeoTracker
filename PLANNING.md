# Planning

[Read the original Portuguese version](PLANNING_original.md)

1. Read and interpret the requirements in English, which is not my first language. So far, I have not needed to search for any translation. I will have to write the documentation in English, which is a challenge and may require some translation support.

2. I understood that the project should have a frontend and a backend in the same repository. Because of that, I decided to create one folder for each: `/frontend` for the React and TypeScript resources, and `/backend` for Python.

3. The project requires Python for the backend. I have more experience with TypeScript, so I will need to review some material and research the best way to apply it.

4. I considered using Vite for the frontend, but chose Next.js because it is practical, familiar to me, and offers useful framework features. It also provides a modern and organized structure for React routes and pages. I also chose Tailwind CSS because I believe it will make component creation more practical.

5. I plan to build the site with a clean visual style, similar to some of my other projects, such as https://maissocioludo-front.vercel.app/.

6. For the backend, I plan to use FastAPI to create the API endpoints. Requests will be stored in memory, as requested, probably using a dictionary where the request identifier is the key.

7. Processing must not block the API. After a request is created, the backend should quickly return the ID and initial status, while processing continues in the background and progressively updates the stored status, progress, logs, and result.

8. On the details screen, the frontend should query the backend at regular intervals to update the request progress. It should stop when the request reaches a final status: `completed` or `error`.

9. One challenge I expect is cancelling a request while it is being processed. The processing must be able to identify that the request was cancelled and avoid changing its data after that.

10. I also plan to separate the types returned by the API into frontend interfaces or types, avoiding `any` and keeping the possible status values typed.

## Problem

Some operations take time to finish, such as data processing and validation. The user should not have to wait on a frozen screen without feedback. Returning an immediate response and showing progress while the process runs is a better experience.

The project should receive the data sent by the user, respond quickly, run the work in the background, and let the user see progress from 0 to 100%, read the logs, and view the final status.

## Expected flow

The user should send a list of numbers through the frontend. The frontend will send this data to the backend through the creation endpoint.

The backend should initially create the request with the `pending` status, store it in memory, and start background processing, immediately returning the request identifier and status to the frontend.

During processing, the request should go through the steps defined in the problem, updating its progress and adding new logs.

The frontend can use the received ID to open the request details page. On that page, it will periodically query the backend to follow the process until it is completed or an error occurs.

## Initial structure

The initial structure I plan to follow is:

```
frontend/
backend/
PLANNING.md
README.md
```
