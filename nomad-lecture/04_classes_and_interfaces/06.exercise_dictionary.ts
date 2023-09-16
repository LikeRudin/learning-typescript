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

// 관점포인트

// 1. TSDoc 스타일의 주석을 작성했습니다.
// TSDoc은  JSDoc의 TypeScript 스타일 작성법입니다.
// 기존 JSDoc에서 method param 타입이나 arg에 관한 설명을 제거하고
// 코드의 동작 및 역할만 기술한  문서를 작성한 것입니다.
// dictionary class 에서 method identifier에 마우스 커서를 올리면 
// /** */ 내부에 기입한 설명을 볼 수 있습니다.

// 2. Interface를 사용하여 dictionary Class의 구성 요소를 선언했습니다.
//  class가 interface에게서 상속받은 모든 속성은 public이 됩니다.
//  단어를 저장하는 역할의 객체는 private이 되어야 하므로,
//  interface 내부가아니라 dictionary class 내부에서 만들었습니다.

// 3. add method의 입력 데이터가 Word class의 instance라고 가정했습니다.
//  dictionary add method의 인자 타입 검증 책임을 Word class 에게 넘겨주므로
//  사전에 넣을 단어를 만들때, "추가적 타입 검증없이" 왕창 뽑아내기 편해집니다.
//  이는 테스트 코드에서 확인하실수있습니다.

// 4. const enum을 사용했습니다.
// enum은 자바스크립트에 없는 구성요소입니다.
// 만약 그냥 enum 키워드만으로 선언하면 자바스크립트로 컴파일되어
// 코드에 남게되고, 빌드해도 프로덕션코드에서 사라지지않습니다.
// 꼭 const를 붙여주세요.
// 이 사실은 오른쪽의 JS 탭에서 컴파일된 코드를 통해 확인할 수있습니다.

// 5. 각 method별 존재 의의에대해 고민했습니다.
// update와 add, 그리고 upsert는 모두 다른 내부 코드를 가집니다.
// add는 해당 단어가 없을경우에만, 추가합니다.
// update는 해당 단어가 있을경우에만, 업데이트합니다.

// 6. 각 method의 반환값을 boolean으로 하여 실행의 성공여부를 알려줍니다.
// update의 책임은 단어를 추가하는것이아니라 이미있는 단어의 정의를 수정하는것입니다.
//  실행했을때, 사전에 해당 단어가없으면 false,  단어가있다면 true 를반환하게 했습니다.
// add, delete 등의 metohd 에도 같은방식으로 적용해주었습니다.
// bulk method는 각 각의 단어에대한 결과를 저장한 boolean[] 배열을 반환합니다.

// 7. class 내부에서 각 method를 재활용했습니다.
// add, update의 동작은 exists를 통해 결정합니다.
// bulkAdd는 add를 여러번 호출하는식으로 작동합니다

// 8. 아쉬운점: upsert를 실행할때 exists가 두번실행됩니다.




// 타입 구현부 

/**
 * 사전에 등재할 단어
 */
type WordObject = {
    term:string,
    definition:string
}

/**
 * 사전에 등재할 단어
 */
class Word {
    term:string;
    definition:string;
    constructor(term:string, definition:string) {
        this.term = term;
        this.definition = definition;
    }
}

/**
 * upsert가 수행한 함수의 종류
*/
const enum UpsertReturn {
    Update = "update",
    Add = "add"
}

/**
 * 단어의 추가, 검색, 삭제, 업데이트, 수정, 등재확인 등을 할 수있는 사전
 */
interface IDictionary{
    /**
     * 사전에 단어를 추가합니다.
     */
    add: (word:Word) => boolean;
    /**
     * 사전에서 단어를 검색합니다.
     */
    get: (term:string) => string | undefined;
    /**
     * 단어를 사전에서 삭제합니다.
     */
    delete: (term:string) => boolean;
    /**
     * 사전에 등재되어있는 단어의 정의를 업데이트합니다.
     */
    update: (word:Word) => boolean;
    /**
     * 사전에 등재되어있는 모든 단어를 콘솔에 출력합니다.
     */
    showAll: () => void;
    /**
     * 사전에 등재되어있는 단어의 수를 반환합니다.
     */
    count: () => number;
    /**
     * 사전에 단어가 등재되어있는지 확인합니다.
     * 단어가 존재하지 않으면 단어를 추가합니다.
     * 단어가 존재한다면 정의를 업데이트합니다.
     */
    upsert: (word:Word) => UpsertReturn;
    /** 
     * 단어가 사전에 등재되어있는지 확인합니다.
     *  */
    exists: (term: string) => boolean;
    /** 
     * 사전에 여러 단어를 한번에 추가합니다.
     *  */
    bulkAdd: (wordObjects: WordObject[]) => boolean[];
    /**
     * 여러 단어를 사전에서 한번에 삭제합니다.
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

// 테스트 코드

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
