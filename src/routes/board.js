const BASE = '/board';
import db from "../../models/index.js";
import c from 'chalk';
const { log } = console;

const dayString = (date) => {
  const day = new Date(date);
  return day.toLocaleString();
};

const boardRouter = [
  {
    method: 'get',
    route: BASE + '/list',
    handler: async (req, res) => {
      const resData = await db.Article.findAll(); 
      const mapData = resData.map(item => ({ ...item.dataValues }));
      const data = mapData.map(article => ({ ...article, updatedAt: dayString(article.updatedAt) }));
      log(c.bgCyan(JSON.stringify(data, null, 2)))
      res.render('./board/list', { data, dayString });
    }
  },
  {
    method: 'get',
    route: BASE + '/create',
    handler: async (req, res) => {
      res.render('./board/create');
    }
  },
  {
    method: 'post',
    route: BASE + '/create',
    handler: async (req, res) => {
      const { title, content, displayYn } = req.body;

      const newData = {
        boardId: 1,
        title,
        content,
        ipAddress: req.ip,
        displayYn,
        registUser: 'ajrfyd'
      }

      log(c.red(newData));

      const data = await db.Article.create(newData);

      res.redirect('/board/list');
    }
  },
  {
    method: 'get',
    route: BASE + '/modify/:id',
    handler: async (req, res) => {
      const { id } = req.params;

      const article = await db.Article.findOne({ where: { articleId: id }});
    
      res.render('./board/modify', { article });      
    }
  },
  {
    method: 'post',
    route: BASE + '/modify/:id',
    handler: async (req, res) => {
      const { id } = req.params;
      const { title, content, displayYn } = req.body;

      const article = await db.Article.findOne({ where: { articleId: id }});
      
      if(article.title === title && article.content === content && article.displayYn === displayYn) return;
      
      const newArticle = {
        ...article,
        title,
        content,
        displayYn
      };

      await db.Article.update(newArticle, { where: { articleId: id }});

      res.redirect('/board/list')
    }
  },
  {
    method: 'get',
    route: BASE + '/delete/:id',
    handler: async (req, res) => {
      const { id } = req.params;

      await db.Article.destroy({ where: { articleId: id }});
      res.redirect('/board/list');
    }
  }
];

export default boardRouter;