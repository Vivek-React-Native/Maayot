# API Documentation

[<-Back](../readme.md)

## DTOs

### /prismic/getIntro?memberId={memberId}&level={level}

```js
[
    {
        id: string,
        image: string,
        language: string,
        level: string,
        levelWord1: string,
        levelWord2: string,
        newWord1: string,
        newWord2: string,
        pinyinWord1: string,
        pinyinWord2: string,
        storyIntroduction: string,
        audio: string,
        definition1: string,
        definition2: string,
        englishTitle: string,
        arContent: iWordDTO[],
        arSentencesWord11: iWordDTO[],
        arSentencesWord12: iWordDTO[],
        arSentencesWord21: iWordDTO[],
        arSentencesWord22: iWordDTO[],
    },
    ...
]
```
######iWordDTO
```
iWordDTO {
  english: string
  pinyin: string
  word: string
}
```

### /tracking/streak/current?memberId={memberId}

```js
[ 
    {
        memberId: string,
        counter: number,
        dates: Date[],
    },
    ...
]
```

### /tracking/streak/longest?memberId={memberId}

```js
[
    {
        memberId: string,
        counter: number,
        fromDate: Date,
        toDate: Date,
    },
    ...
]
```

### /tracking/streak/monthly?memberId={memberId}&month={month}

```js
[
    {
        memberId: string,
        data: Date[],
    },
    ...
]
```

### //profile

```js
[
    {
        member: {
            id: string,
            email: string,
            stripeInfo: {
              customer: string
            },
            createdAt: Date,
            accessTokenExpires: Date,
            metaData: {
              fullName: string,
              level: string,
            },
            membership: Array,
            customFields: {
              'first-name': string,
              level: string,
            },
        }
    }
]
```

### /login

```js
[
    {
        email: string,
        token: string,
        membership: {
          id: string,
          name: string,
          status: string,
          signupDate: string,
        },
        information: {
          id: string,
          level: string,
          firstName: string,
        },
    }
]
```
