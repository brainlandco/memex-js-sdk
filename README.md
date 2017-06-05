# Memex JavaScript SDK


## What is Memex?

Memex is lightweight personal knowladge base with automatic content management. It means that it helps organise every piece of knowledge (notes, urls, sketches, comments, etc.). These pieces (spaces) are interconnected using memory links which helps to navigate and associate it into more compact knowledge. It is just like web but more lightweight and only personal. 

### Space
Core concept of Memex is space which is bundle/collection/folder of small pieces of knowledge. It can be piece of text (text space) note or large collection of links to other collections (collection space).

There is a few standard space types in two core categories:

1. Collection-oriented - defined/represented by its caption
	* Collection - abstract set of links to other spaces
2. Atomic (shortly atoms) - defined/represented by caption and linked media
	* WebPage - decorated URL to any webpage
	* Text - small textual piece of information/note or anything that can be written
	* Image - visual piece of knowledge

Space has wollowing structure:

```javascript
class Space {
  muid: ?string;
  spaceType: SpaceType;
  caption: ?string;
  representations: ?Array<Media>;
  color: ?string;
  state: EntityState;
}
```

### Link

Another core principle of memex is link which is nothing more than connection between two spaces. So if there exists association between two things/ideas/spaces in users brain there should be also oriented link in memex.

```javascript
class Link {
  muid: ?string;
  origin: Space;
  target: Space;
  state: EntityState;
}
```

### Media

Piece of data that can be users avatar or image/textual representation of space.

```javascript
class Media {
  muid: ?string;
  state: EntityState;
  mediaType: MediaType;
  embedData: ?ArrayBuffer;
  dataDownloadURL: ?string;
  dataUploadURL: ?string;
  dataState: MediaDataState;
  representsSpace: ?Space;
}
```

## Smart Fetaures

Today memex supports two smart features that will help user to automatically manage his content.

#### Auto-Categorization (Autodump)

First one is called autodump and will automatically link new space with most fitting already existing space. Eg. If user drops webpage url and there already exists similar collection of spaces then Memex will try to automatically create link from this collection to newly created space. See Examples section.

#### Auto-Captioning

Are you creating collection of spaces but dont know how to name it?Another smart feature that is offered by Memex is automatic captioning/summarization of space. Just provide set of space MUIDs and we will tell you what is the best name for it.


## Setup
### 1. Create app and get your app token

Go to [Memex Dev Center](https://memex.co/apps/dev) and create your app. You dont need to wait for approval and continue to step 2.  


### 2. Add memex-js-sdk module to your NPM package.json

Go to root directory of your app and run this command in Terminal.

```
npm install memex-js-sdk --save
```

### 3. Import module

Import memex sdk into every JavaScript file where you want to use it.

```javascript
import Memex from 'memex-js-sdk';
```

### 4. Configure SDK with app token

In your app.js or any place where you bootstrap your libraries place this line.

```javascript
Memex.sharedClient.setAppToken('<YOUR APP TOKEN>');
```

## Examples

### Authentication

Only supported user authentication method in JS sdk is using clients credentials (email & password).

```javascript
import Memex from 'memex-js-sdk';

// ...

Memex.sharedClient.login(email, password, (token: ?string, success: bool) => {
  if (success === false) {
	 // failure
    return;
  }
  // success
});
```

### Get origin/space

If you want get users origin space or any other space use its MUID (memex unique identifier).

```javascript
Memex.sharedClient.getSpace(this.props.originMuid, (space: ?Memex.Space, success: bool) => {
  if (success === false || space == null) {
  	 // something wrong happened
    return;
  }
  // start using space object
});
```

### Get links

```javascript
Memex.sharedClient.getSpaceLinks(muid, (links: ?Array<Memex.Link>, success: bool) => {
      if (success === false) {
        // failure
        return;
      }
      // success, show links to user
    });
```


### Create space

If you want to create new space in users memex you can use one of following three options for webpage space, textual space or image space.

```javascript
Memex.sharedClient.createWebPageSpace(url, true, completion);
```

```javascript
Memex.sharedClient.createTextSpace(text, true, completion);
```

```javascript
Memex.sharedClient.createImageSpace(imageURL, true, completion);
```

Or you can create any other space.

```javascript
let space = new Space();
space.caption = ...
space.representations = ...
Memex.sharedClient.createSpace(space, false, completion);
```

## Documentation

Each function of SDK is documented using JSDoc. See generated [documentation](http://memex.co/apps/dev/doc/js).

## Other Platform APIs

* [REST API](https://github.com/memexapp/memex-rest-api-doc)  
* [Swift SDK](https://github.com/memexapp/memex-swift-sdk)  
* [Go SDK](https://github.com/memexapp/memex-go-sdk)  

## Contact Us

If you need any other help please contact us at [hello@memex.co](mailto:hello@memex.co)  