import writeJsonFile from 'write-json-file';
import { name, version, main, port, dbconn, dependencies } from './package.json';

const prodPackageJson = {
  name, version, main, port, dbconn, dependencies
};

writeJsonFile( './dist/package.json', prodPackageJson)
  .then(() => console.log('Created package.json for production!'));
