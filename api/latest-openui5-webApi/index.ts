import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('Starting API request processing');

    // Setup
    let idParam = null;
    let response = null;

    // Move JSON data from storage blob for readability
    const versionJSON = context.bindings.inputBlob;
    const queryParams = req.query;
    const type = queryParams.type || "runtime";

    if (context.bindingData.id) {
        idParam = context.bindingData.id;
        context.log(`Request has parameter: ${idParam}`);
    }

    // If theres no id parameter, return latest 
    if (idParam === null) {
        if (queryParams.format === 'json') {
            response = {
                headers: {
                    'Content-Type': 'application/json'
                },
                status: 200,
                body: {
                    'version': versionJSON['latest'].version,
                    'type': type,
                    'url': versionJSON['latest'][type]
                }
            }
        } else {
            response = {
                status: 200,
                body: versionJSON['latest'][type]
            };
        }
    } else {
        // There is a id here, check if it's a saved version
        const queriedVersion = versionJSON.versions[idParam];
        if (queriedVersion) {
            // We have the version saved
            if (queryParams.format === 'json') {
                response = {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    status: 200,
                    body: {
                        'version': queriedVersion.version,
                        'type': type,
                        'url': queriedVersion[type]
                    }
                }
            } else {
                response = {
                    status: 200,
                    body: queriedVersion[type]
                };
            }
        } else {
            // Version is not available
            context.log(`Version not found in db. Version: ${idParam}`);
            response = {
                headers: {
                    'Content-Type': 'text/html'
                },
                status: 404,
                body: `Version not found in db. Version: ${idParam}`
            };
        }
    }

    // Catch all, if something slips through. It should never trigger this.
    if (response === null) {
        response = {
            headers: {
                'Content-Type': 'application/json'
            },
            status: 400,
            body: {
                message: `Something is wrong. Please check the documentation.`,
                url: 'https://github.com/rsletta/latest-openui5-landing-page/tree/master/api'
            }
        };
    }

    context.res = response;
    context.done();
};

export default httpTrigger;