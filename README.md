
# fs-force

## Requirements

 * Node >= 5.0.0, with `--es-staging` flag

## Examples

### Prerequisite

You need this function to run every following examples (except the stuffs-deletion one)

```javascript
function getAction(action) {
    if (action.length) {
        let deletedfiles = action.filter((act) => act.type === 'delete');
        return deletedfiles.length ? `has replaced ${deletedfiles.join(', ')}` : 'has come to exists';
    }
    return 'is already exists';
};
```

### Create directory if not exist

#### Asynchronous

```javascript
var mkdir = require('fs-force/mkdir');
mkdir('./temp/need-to-exist', (error, info) => {
    if (error) {
        console.error('Failed');
    } else {
        console.log(`Directory ${info.path} ${getAction(info.action)}`);
    }
});
```

#### Synchronous

```javascript
var mkdirSync = require('fs-force/mkdir-sync');
try {
    let info = mkdirSync('./temp/need-to-exist');
    console.log(`Directory ${info.path} ${getAction(info.action)}`);
} catch (error) {
    console.error('Failed');
}
```

### Create a file in a directory that may don't even exists

#### Asynchronous

```javascript
var writeFile = require('fs-force/write-file');
writeFile('temp/may-not-exist/file.txt', 'Hello, World!!', (error, info) => {
    if (error) {
        console.error('Failed');
    } else {
        console.log(`File ${info.path} ${getAction(info.action)}`);
    }
})
```

#### Synchronous

```javascript
var writeFileSync = require('fs-force/write-file-sync');
try {
    let info = writeFileSync('./temp/may-not-exist/file.txt', 'Hello, World!!');
    console.log(`File ${info.path} ${getAction(info.action)}`);
} catch (error) {
    console.error('Failed');
}
```

### Delete things

#### Asynchronous

```javascript
var rm = require('fs-force/delete');
rm('temp/shall-be-deleted', (error, info) => {
	if (error) {
		console.error('Failed');
	}
	console.log(info.action.length ? 'Deleted' : 'It does not exists');
});
```

#### Synchronous

```javascript
var rmSync = require('fs-force/delete-sync');
try {
	let havedone = rmSync('temp/shall-be-deleted').action.length;
	console.log(havedone ? 'Deleted' : 'It does not exists');
} catch (error) {
	console.error('Failed');
}
```

## License

[MIT](https://github.com/ksxnodemodules/fs-force/blob/master/LICENSE.md) © [Hoàng Văn Khải](https://github.com/KSXGitHub)
