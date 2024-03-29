!["Logo"](repository-header.png)

![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/rsletta/latest-openui5-landing-page?filename=api%2Fpackage.json)
[![GitHub license](https://img.shields.io/github/license/rsletta/get_openui5_latest_url.svg)](https://github.com/rsletta/get_openui5_latest_url/blob/master/LICENSE)

A small webservice that returns url to latest OpenUI5 version. Hosted at https://latest-openui5.rikosjett.com. Version URLs are collected from https://openui5.org/releases/. This API only serves URLs to the official downloads. API call with only type specified, returns the url as a string. If you leave out query options, it defaults to return the runtime URL. When adding format=json, it returns a richer response.

## Endpoints

API host: `https://latest-openui5.rikosjett.com`

### Get latest

**URL**: `/api/v1/latest`

**Method**: `GET`

**Query options**:
* type: sdk | runtime | runtimeMobile (optional)
* format: json (optional)

**Example**: `GET /api/v1/latest?type=runtime&format=json`

#### Success Response

**Code**: `200`

**Returns**: `application/json`

Data example
```json 
{
    "version": "1.65.1",
    "type": "runtime",
    "url": "https://openui5.hana.ondemand.com/downloads/openui5-runtime-1.65.1.zip"
}
```

### Get latest major.minor

**URL**: `/api/v1/latest/major.minor`

**Method**: `GET`

**Query options**:
* type: sdk | runtime | runtimeMobile (optional)
* format: json (optional)

**Example**: `GET /api/v1/latest/1.52?type=runtime&format=json`

#### Success Response

**Code**: `200`

**Returns**: `application/json`

Data example
```json 
{
    "version": "1.52.27",
    "type": "runtime",
    "url": "https://openui5.hana.ondemand.com/downloads/openui5-runtime-1.52.27.zip"
}
```

#### Error Responses

**Type**: Document not found

**Code** `404`

**Returns**: `text/html`

Data example
```
Version not found in db. Version: X.X
```

## Disclaimer
I have no affiliation to the [OpenUI5](https://openui5.org) team or [SAP SE](https://www.sap.com). This API is provided as a service to the OpenUI5 community.