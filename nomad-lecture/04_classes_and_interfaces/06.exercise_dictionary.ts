type Word = {
  [key: string]: string;
};

class Dict {
  private words: Word;

  constructor(words: Word) {
    this.words = {};
  }

  add = (term: string, def: string) => {
    if (this.words[term] !== undefined) {
      console.log(`${term} is already defined`);
      return;
    }
    this.words[term] = def;
    console.log(`${term}: ${def} is added `);
  };

  get = (term: string) => {
    if (this.words[term] === undefined) {
      console.log(`${term} is not defined`);
      return;
    }
    return this.words[term];
  };

  delete = (term: string) => {
    if (this.words[term] === undefined) {
      console.log(`${term} is not defined`);
      return;
    }
    delete this.words[term];
    console.log(`${term} is deleted`);
  };

  update = (term: string, def: string) => {
    if (this.words[term] === undefined) {
      console.log(`${term} is not defined`);
      return;
    }
    console.log(`${term}: ${this.words[term]} -> ${def}`);
    this.words[term] = def;
  };

  count = () => {
    const count = Object.keys(this.words).length;
    console.log(`dictionary has ${count} words`);
    return count;
  };

  upsert = (term: string, def: string) => {
    if (this.words[term] !== undefined) {
      console.log(`${term}: ${this.words[term]} -> ${def}`);
      this.words[term] = def;
      return;
    }

    this.words[term] = def;
    console.log(`${term}: ${def} is added `);
  };

  exists = (term: string) => {
    if (this.words[term] === undefined) {
      console.log(`${term} is not defined`);
      return false;
    }

    console.log(`${term} is defined`);
    return true;
  };

  bulkAdd = (wordList: Word[]) => {
    wordList.forEach((item) => (this.words[item["term"]] = item["definition"]));
  };

  bulkDelete = (termList: string[]) => {
    termList.forEach((item) => delete this.words[item]);
  };

  showAll = () => {
    Object.keys(this.words).forEach((key) =>
      console.log(`${key}: ${this.words[key]}`)
    );
  };
}

const myDict = new Dict({});

myDict.add("kimchi", "food");

myDict.get("kimchi");

myDict.get("hi");

myDict.delete("hi");

myDict.delete("kimchi");

myDict.add("tomato", "superFood");

myDict.update("tomato", "normalFood");

myDict.get("tomato");

myDict.upsert("kimchi", "delicious food");

myDict.upsert("tomato", "bad tasty food");

myDict.exists("kimchi");

myDict.exists("potato");

myDict.bulkAdd([
  { term: "김치", definition: "대박이네~" },
  { term: "아파트", definition: "비싸네~" },
]);

myDict.showAll();
myDict.count();
myDict.bulkDelete(["김치", "아파트"]);
myDict.showAll();
