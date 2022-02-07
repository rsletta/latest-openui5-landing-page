import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.', context, req.query);
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = `${context.bindingData.id}  ${req.query}`
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

    context.done();
};

export default httpTrigger;