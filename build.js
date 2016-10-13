import writeJsonFile from 'write-json-file';
import { name, version, main, dependencies } from './package.json';

const prodPackageJson = {
  name, version, main, dependencies
};

writeJsonFile( './dist/package.json', prodPackageJson)
  .then(() => console.log('Created package.json for production!'));
