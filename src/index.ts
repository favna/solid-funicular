import { fetch, FetchMediaContentTypes, FetchMethods, FetchResultTypes } from '@sapphire/fetch';

import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
	http.post('http://localhost:8080/upload', async ({ request }) => {
        // Note how this will work because the body is no longer an application/octet-stream. When commenting out the lines that create the problem this throws an error
        const body = await request.json();
        debugger;
		return HttpResponse.json(body, { status: 200 });
	})
);

server.listen();

const createFile = (blobParts: BlobPart[], fileName: string) =>
	new File(blobParts, fileName, {
		lastModified: Date.now()
	});

const file = {
	name: 'pokemon-names',
	file: createFile(['dratini', 'dragonair', 'dragonite'], 'pokemon.pdf')
};

const response = await fetch(
	'http://localhost:8080/upload',
	{
		body: file.file,
		method: FetchMethods.Post,
		headers: {
			'Content-Type': FetchMediaContentTypes.OctetStream,
			filename: file.name
		}
	},
	FetchResultTypes.Result
);

console.log('response status: ', response.status);

server.close();
