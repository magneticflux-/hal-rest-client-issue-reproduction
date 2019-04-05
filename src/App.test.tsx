/**
 * @jest-environment node
 */

import {createClient} from "hal-rest-client";
import {Thing} from "./Thing";
import nock from 'nock';

const pageObject = {
    size: 20,
    totalElements: 24,
    totalPages: 2,
    number: 0
};

function setupNock() {
    nock("http://test.com/")
        .get('/api').reply(200, {
        "_links": {
            "things": {
                "href": "http://test.com/api/things{?page,size,sort,projection}",
                "templated": true
            }
        }
    })
        .get('/api/things').reply(200, {
        "_embedded": {},
        "_links": {
            "first": {
                "href": "http://test.com/api/things?page=0&size=20"
            },
            "self": {
                "href": "http://test.com/api/things{?page,size,sort,projection}",
                "templated": true
            },
            "next": {
                "href": "http://test.com/api/things?page=1&size=20"
            },
            "last": {
                "href": "http://test.com/api/things?page=1&size=20"
            },
            "profile": {
                "href": "http://test.com/api/profile/things"
            }
        },
        page: pageObject
    });
}

it('fetches data via prop function', async () => {
    setupNock();

    const client = createClient("http://test.com/api");
    const result: Thing = await client.fetch('things', Thing);

    expect(result.prop('page'))
        .toEqual(pageObject)
});

it('fetches data via object property', async () => {
    setupNock();

    const client = createClient("http://test.com/api");
    const result: Thing = await client.fetch('things', Thing);

    expect(result.page)
        .toEqual(pageObject)
});
