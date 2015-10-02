/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import { join } from 'path';
import { Router } from 'express';
import jade from 'jade';
import fm from 'front-matter';
import fs from '../utils/fs';
import xml2js from 'xml2js';


// A folder with Jade/Markdown/HTML content pages
const CONTENT_DIR = join(__dirname, './content');

// Extract 'front matter' metadata and generate HTML
const parseJade = (path, jadeContent) => {
  const fmContent = fm(jadeContent);
  const htmlContent = jade.render(fmContent.body);
  return Object.assign({ path, content: htmlContent }, fmContent.attributes);
};

const router = new Router();

router.get('/', async (req, res, next) => {
  try {
    const path = req.query.path;

    if (!path || path === 'undefined') {
      res.status(400).send({error: `The 'path' query parameter cannot be empty.`});
      return;
    }

// 
// # Handle Home Page/Default Page
// 
    let fileName = join(CONTENT_DIR, (path === '/' ? '/index' : path) + '.jade');
    if (!await fs.exists(fileName)) {
      fileName = join(CONTENT_DIR, path + '/index.jade');
    }

    if (!await fs.exists(fileName)) {
      res.status(404).send({error: `The page '${path}' is not found.`});
    } else {
      const source = await fs.readFile(fileName, { encoding: 'utf8' });
      const content = parseJade(path, source);
      res.status(200).send(content);
    }
  } catch (err) {
    next(err);
  }
});

var convertToJson = function (xml) {
  return new Promise(function(resolve, reject) {
    var parser = new xml2js.Parser({explicitArray : false});
        parser.parseString(xml, function (err, result) {
    resolve(result);
    });
    });
}

router.get('/gmx/', async (req, res, next) => {
  try {
    const path = req.query.path;

    if (!path || path === 'undefined') {
      res.status(400).send({error: `The GMX 'path' query parameter cannot be empty.`});
      return;
    }

// 
// # Handle Home Page/Default Page
// 
    let fileName = join("C:\\Users\\F561273\\Desktop\\lgm\\test.gmx", path);
    
    if (!await fs.exists(fileName)) {
      res.status(404).send({error: `The page GMX '${path}' is not found.`});
    } else {
      const content = await fs.readFile(fileName, { encoding: 'utf8' });
      const jsonContent = await convertToJson(content);
      
      // xml2js.parseString(content)
      
      res.status(200).send(jsonContent);
    }
  } catch (err) {
    next(err);
  }
});

export default router;

