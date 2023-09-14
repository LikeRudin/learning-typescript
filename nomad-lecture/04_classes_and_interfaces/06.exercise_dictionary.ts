// type Word = {
//   [key: string]: string;
// };

// class Dict {
//   private words: Word;

//   constructor(words: Word) {
//     this.words = {};
//   }

//   add = (term: string, def: string) => {
//     if (this.words[term] !== undefined) {
//       console.log(`${term} is already defined`);
//       return;
//     }
//     this.words[term] = def;
//     console.log(`${term}: ${def} is added `);
//   };

//   get = (term: string) => {
//     if (this.words[term] === undefined) {
//       console.log(`${term} is not defined`);
//       return;
//     }
//     return this.words[term];
//   };

//   delete = (term: string) => {
//     if (this.words[term] === undefined) {
//       console.log(`${term} is not defined`);
//       return;
//     }
//     delete this.words[term];
//     console.log(`${term} is deleted`);
//   };

//   update = (term: string, def: string) => {
//     if (this.words[term] === undefined) {
//       console.log(`${term} is not defined`);
//       return;
//     }
//     console.log(`${term}: ${this.words[term]} -> ${def}`);
//     this.words[term] = def;
//   };

//   count = () => {
//     const count = Object.keys(this.words).length;
//     console.log(`dictionary has ${count} words`);
//     return count;
//   };

//   upsert = (term: string, def: string) => {
//     if (this.words[term] !== undefined) {
//       console.log(`${term}: ${this.words[term]} -> ${def}`);
//       this.words[term] = def;
//       return;
//     }

//     this.words[term] = def;
//     console.log(`${term}: ${def} is added `);
//   };

//   exists = (term: string) => {
//     if (this.words[term] === undefined) {
//       console.log(`${term} is not defined`);
//       return false;
//     }

//     console.log(`${term} is defined`);
//     return true;
//   };

//   bulkAdd = (wordList: Word[]) => {
//     wordList.forEach((item) => (this.words[item["term"]] = item["definition"]));
//   };

//   bulkDelete = (termList: string[]) => {
//     termList.forEach((item) => delete this.words[item]);
//   };

//   showAll = () => {
//     Object.keys(this.words).forEach((key) =>
//       console.log(`${key}: ${this.words[key]}`)
//     );
//   };
// }

// const myDict = new Dict({});

// myDict.add("kimchi", "food");

// myDict.get("kimchi");

// myDict.get("hi");

// myDict.delete("hi");

// myDict.delete("kimchi");

// myDict.add("tomato", "superFood");

// myDict.update("tomato", "normalFood");

// myDict.get("tomato");

// myDict.upsert("kimchi", "delicious food");

// myDict.upsert("tomato", "bad tasty food");

// myDict.exists("kimchi");

// myDict.exists("potato");

// myDict.bulkAdd([
//   { term: "김치", definition: "대박이네~" },
//   { term: "아파트", definition: "비싸네~" },
// ]);

// myDict.showAll();
// myDict.count();
// myDict.bulkDelete(["김치", "아파트"]);
// myDict.showAll();


/**
 * object: word를 표현하는 object
 */
type WordObject = {
    term:string,
    definition:string
}

/**
 * class: 사전에 추가할 word 하나를 표현 
 */
class Word {
    /**
     * word의 단어
     */
    term:string;
    /**
     * word의 정의
     */
    definition:string;
    constructor(term:string, definition:string) {
        this.term = term;
        this.definition = definition;
    }
}

/**
 * enum: upsert가 수행한 함수
 *
*/
const enum UpsertReturn {
    /**
     * update 수행시 return 값
     */
    Update = "update",
    /**
     * add 수행시 return 값
     */
    Add = "add"
}

/**
 * Dictionary의 메서드를 포함한 interface
 * @주의: interface를 상속받은경우, private modifier를 붙여줄 수없습니다.
 */
interface IDictionary{
    /**
     * method: 단어를 사전에 추가
     */
    add: (word:Word) => boolean;
    /**
     * method: 단어를 사전에서 검색
     */
    get: (term:string) => string | undefined;
    /**
     * method: 단어를 사전에서 삭제
     */
    delete: (term:string) => boolean;
    /**
     * method: 존재하는 단어의 정의를 업데이트
     */
    update: (word:Word) => boolean;
    /**
     * method: 존재하는 단어 전부 출력
     */
    showAll: () => void;
    /**
     * method: 사전에 저장된 단어 수 반환
     */
    count: () => number;
    /**
     * method: 단어를 업데이트 하거나/ 추가
     */
    upsert: (word:Word) => UpsertReturn;
    /**
     * method: 단어가 사전에 존재하는지 확인
     */
    exists: (term: string) => boolean;
    /**
     * method: 단어를 한꺼번에 사전에 추가
     */
    bulkAdd: (wordObjects: WordObject[]) => boolean[];
    /**
     * method: 단어를 한꺼번에 사전에서 제거
     */
    bulkdelete: (terms: string[]) => boolean[];
}



class Dictionary implements IDictionary{
    private dict: Map<string,string>;
    constructor(){
        this.dict = new Map();
    }
    public exists(term:string){
        return this.dict.has(term)
    }

    public add(word: Word){
        if(this.exists(word.term)){
            return false
        }
        this.dict.set(word.term, word.definition);
        return true
        }
    
    public get(term: string){
        return this.dict.get(term);
    }

    public delete(term:string){
        if(this.exists(term)){
            this.dict.delete(term);
            return true
        }
        return false
    }

    public update(word:Word){
        if(this.exists(word.term)){
            this.dict.set(word.term, word.definition);
            return true;
        }
        return false;
    }

    public showAll(){
        const terms = this.dict.keys()
        for (const item of terms){
            console.log(item);
        }
    }
    
    public count(){
        return this.dict.size;
    }

    public upsert(word:Word){
        if (this.exists(word.term)){
            this.update(word);
            return UpsertReturn.Update
        } 
        this.add(word);
        return UpsertReturn.Add

    }

    public bulkAdd(wordObjects: WordObject[]){
        const result = wordObjects.map(wordObject => {
            const {term, definition} = wordObject;
            const word = new Word(term,definition);
            return this.add(word);
        });
        return result;
    }

    public bulkdelete(terms: string[]){
        const result = terms.map(term => {
            return this.delete(term);
        })
        return result;
    }

}

const test = () => {
    console.log("test start");

    console.log("0. creating dictionary");
    const myDictionary = new Dictionary();
    console.log("created Dictionary");
    console.log(myDictionary);

    console.log("add return true")
    const word1 = new Word("태영", "2조TA");
    const word2 = new Word("플린", "1조TA");
    console.log("Add word1:", myDictionary.add(word1)); // true
    console.log("Add word2:", myDictionary.add(word2)); // true

    console.log("add return false");
    console.log("Add word1:", myDictionary.add(word1)); // false

    console.log("update return true ")
    const updatedWord1 = new Word("태영", "리액트 개발자");
    console.log("Update word1:", myDictionary.update(updatedWord1)); // true

    console.log("update return false")
    const nonExistingWord = new Word("빡준", "리액트 TA");
    console.log("updated nonExistingWord:", myDictionary.update(nonExistingWord));

    console.log("delete return true");
    console.log("Delete word1:", myDictionary.delete("태영")); // true
    
    console.log("delete return false");
    console.log("delete word1:", myDictionary.delete("태영"));

    console.log("show all words");
    myDictionary.showAll();
    
    console.log("count return size");
    console.log("Word count:", myDictionary.count()); //0

    console.log("exists return false");
    console.log("Exists '태영':", myDictionary.exists("태영")); 

    console.log("exists return true");
    myDictionary.add(word1);
    console.log("Exists '태영':", myDictionary.exists("태영")); 

    console.log("add multiple words");
    const wordObjects = [
        { term: "보라", definition: "crew" },
        { term: "Max", definition: "crew" },
        ];
    console.log("Bulk add result:", myDictionary.bulkAdd(wordObjects));
    myDictionary.showAll();

    console.log("deleting multiple words");
    const deleteTerms = ["태영", "보라"];
    console.log("Bulk delete result:", myDictionary.bulkdelete(deleteTerms));
    console.log("words after bulkDelete")
    myDictionary.showAll();
}
test();
