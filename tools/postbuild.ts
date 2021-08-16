import { cp } from 'shelljs';
import { join } from 'path';

const folders = new Set([join(__dirname, '..', 'views'), join(__dirname, '..', 'public')]);
const dist = join(__dirname, '..', 'dist');

folders.forEach(f => cp('-R', f, dist));