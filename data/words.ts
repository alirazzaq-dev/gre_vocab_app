export type Chapters = Chapter[];
export type Chapter = Word[];

export type Word = {
    "word": string,
    "definition": string,
    "urduMeaning": string,
    "exampleSentences": string[]
}

export const chapter1: Chapter = [
    {
        "word": "Anachronism",
        "definition": "Something that is misplaced in time; a person or thing that belongs to a different period.",
        "urduMeaning": "بے محل (be mahal), بے وقت کا (be waqt ka), زمانہ گزرا (zamanah guzra)",
        "exampleSentences": [
            "The knight in shining armor was an anachronism at the modern-day costume party.",
            "The professor's lecture on dinosaurs included humorous anachronisms, such as imagining them wearing hats.",
            "The film's depiction of ancient Rome contained several anachronisms, including anachronistic technology."
        ],
    },
    {
        "word": "Acquiesce",
        "definition": "To accept or submit to something reluctantly or without arguing.",
        "urduMeaning": "مان لینا (man lena), ہار ماننا (haar manna), رضا مند ہونا (raza mand hona)",
        "exampleSentences": [
            "After much debate, the team acquiesced to the leader's decision.",
            "He reluctantly acquiesced to his parents' wishes and chose a different career path.",
            "Although dissatisfied, the citizens ultimately acquiesced to the new laws."
        ],
    },
    {
        "word": "Circuitous",
        "definition": "Indirect, roundabout, taking a longer and more complicated route.",
        "urduMeaning": "گھوم پھر کر (ghom phir kar), غیر براہ راست (ghair barah rast)",
        "exampleSentences": [
          "Instead of using the main road, the traveler took a circuitous path through the scenic countryside.",
          "The detective followed a circuitous trail of clues to apprehend the thief.",
          "Their journey to the summit was far from straightforward, taking a circuitous route around treacherous cliffs."
        ],
      },
      {
        "word": "Abrogate",
        "definition": "To formally cancel or annul a law, treaty, or agreement.",
        "urduMeaning": "منسوخ کرنا (mansookh karna), کالعدم قرار دینا (kaldam qarar dena)",
        "exampleSentences": [
          "The new government abrogated the previous administration's trade agreement with the neighboring country.",
          "Feeling betrayed, the couple abrogated their wedding vows before the ceremony.",
          "Facing public pressure, the parliament abrogated the harsh penal code that had been in place for decades."
        ],
      },
      {
        "word": "Cavalier",
        "definition": "Dismissive, casual, or unconcerned about something serious or important.",
        "urduMeaning": "بے پروا (be parwa), لاابالی (la abali), بے توجہ (be tujja)",
        "exampleSentences": [
          "The CEO's cavalier attitude towards employee safety led to an avoidable accident in the factory.",
          "He took a cavalier approach to his studies, expecting to pass without much effort, which ultimately led to poor grades.",
          "Despite the approaching deadline, the team maintained a cavalier atmosphere, confident in their abilities to finish the project on time."
        ],
      },





    // {
    //     name: "Cogent",
    //     desc: "clear, logical, and convincing",
    //     example: "they put forward cogent arguments for British membership"
    // },
    // {
    //     name: "Bolster",
    //     desc: "support or strengthen",
    //     example: "the fall in interest rates is starting to bolster confidence"
    // },
    // {
    //     name: "Vigilant",
    //     desc: "keeping careful watch for possible danger or difficulties.",
    //     example: "the burglar was spotted by vigilant neighbours"

    // },
    // {
    //     name: "Implausible",
    //     desc: "(of an argument or statement) not seeming reasonable or probable; failing to convince.",
    //     example: "this is a blatantly implausible claim"
    // },
    // {
    //     name: "Contentious",
    //     desc: "of an argument or statement) not seeming reasonable or probabl",
    //     example: "a contentious issue"
    // }





]

export const chapters: Chapters = [chapter1]