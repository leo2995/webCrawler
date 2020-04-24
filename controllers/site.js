const cheerio = require("cheerio");
const axios = require("axios");

exports.mercadolivre = (req, res) => {
  let search = req.body.search;
  let secondTermSearch = search.replace(/\s/g, "%20");
  search = search.replace(/\s/g, "-");
  const limit = req.body.limit;

  if (!isNaN(limit)) {
    searchCrawlerItens(pageResponse, search, secondTermSearch, limit)
      .then((req) => {
        let list = req;
        let partOfList = list.slice(0, limit);
        res.json(partOfList);
      })
      .catch((err) => console.log("error", err));
  } else {
    res.json({
      error: { message: "limit need to be a positive number" },
    });
  }
};

const pageResponse = (html) => {
  let $ = cheerio.load(html);
  return $(".item__info")
    .map((index, element) => ({
      name: $(element).find(".item__title a").text().trim(),
      link: $(element).find(".item__title a").attr("href"),
      state: $(element).find(".item__condition").text().trim(),
      price: $(element).find(".price__fraction").text().trim(),
      store: $(element).find(".item__brand-title-tos").text().trim(),
    }))
    .get();
};

const searchCrawlerItens = async (LeanResponse, search, secondTermSearch) => {
  try {
    const response = await axios({
      url: `https://lista.mercadolivre.com.br/${search}#D[A:${secondTermSearch}]`,
      method: "get",
    });
    const objReturn = await LeanResponse(response.data);
    return Promise.resolve(objReturn);
  } catch (err) {
    return Promise.reject(err);
  }
};

exports.mercadolivreGet = (req, res) => {
  res.json({
    message: {
      message: "try to send by post ",
      ex: {
        search: "bicicleta",
        limit: "2",
      },
    },
  });
};
