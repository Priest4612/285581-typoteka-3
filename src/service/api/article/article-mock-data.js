'use strict';

const roles = [
  `автор`,
  `читатель`
];

const categories = [
  `Музыка`,
  `Деревья`,
  `Разное`,
  `Кино`,
  `За жизнь`,
  `IT`,
  `Программирование`,
  `Без рамки`,
  `Железо`
];

const users = [
  {
    userRoleId: 1,
    firstname: `Lavon`,
    lastname: `Leuschke`,
    email: `Hadley_Rippin43@gmail.com`,
    password: `0a99Qx_`,
    avatar: `/img/avatar-1.png`
  },
  {
    userRoleId: 2,
    firstname: `Cecilia`,
    lastname: `Turner`,
    email: `Courtney.Renner@hotmail.com`,
    password: `CpsqWMM--CE`,
    avatar: `/img/avatar-2.png`
  },
  {
    userRoleId: 2,
    firstname: `Roxanne`,
    lastname: `Hyatt`,
    email: `Lenny_Macejkovic@gmail.com`,
    password: `hCdvYNyBo3`,
    avatar: `/img/avatar-3.png`
  },
  {
    userRoleId: 2,
    firstname: `Jayda`,
    lastname: `Goldner`,
    email: `Carli.Harris@yahoo.com`,
    password: `coA3ELlJ`,
    avatar: `/img/avatar-4.png`
  },
  {
    userRoleId: 2,
    firstname: `Buck`,
    lastname: `Baumbach`,
    email: `Kristofer25@gmail.com`,
    password: `AEoKgVvOc8Ri5n`,
    avatar: `/img/avatar-5.png`
  }
];

const articles = [
  {
    title: `Что такое золотое сечение`,
    announce: `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
    fullText: `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Он написал больше 30 хитов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
    userId: 3,
    categories: [
      `Музыка`,
      `Программирование`,
      `Кино`,
      `Железо`,
      `Деревья`,
      `IT`,
      `Разное`
    ],
    images: {
      path: `/img/forest@1x.jpg`
    },
    comments: [
      {
        text: `Хочу такую же футболку :-), Мне не нравится ваш стиль. Ощущение, что вы меня поучаете., Плюсую, но слишком много буквы!, Мне кажется или я уже читал это где-то?, Это где ж такие красоты?, Согласен с автором!,`,
        userId: 1
      },
      {
        text: `Согласен с автором!, Плюсую, но слишком много буквы!, Мне кажется или я уже читал это где-то?,`,
        userId: 4
      },
      {
        text: `Совсем немного...,`,
        userId: 4
      },
      {
        text: `Хочу такую же футболку :-), Мне не нравится ваш стиль. Ощущение, что вы меня поучаете., Плюсую, но слишком много буквы!, Это где ж такие красоты?, Совсем немного...,`,
        userId: 3
      },
      {
        text: `Планируете записать видосик на эту тему? Плюсую, но слишком много буквы!,`,
        userId: 4
      },
      {
        text: `Плюсую, но слишком много буквы!,`,
        userId: 5
      },
      {
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили., Мне не нравится ваш стиль. Ощущение, что вы меня поучаете., Хочу такую же футболку :-), Планируете записать видосик на эту тему?`,
        userId: 3
      },
      {
        text: `Согласен с автором!, Плюсую, но слишком много буквы!, Совсем немного...,`,
        userId: 3
      },
      {
        text: `Мне кажется или я уже читал это где-то?, Мне не нравится ваш стиль. Ощущение, что вы меня поучаете., Это где ж такие красоты?, Планируете записать видосик на эту тему? Совсем немного..., Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.,`,
        userId: 3
      },
      {
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете., Плюсую, но слишком много буквы!, Совсем немного..., Хочу такую же футболку :-), Согласен с автором!,`,
        userId: 3
      },
      {
        text: `Это где ж такие красоты?, Мне кажется или я уже читал это где-то?,`,
        userId: 3
      }
    ]
  },
  {
    title: `Как перестать беспокоиться и начать жить`,
    announce: `Это один из лучших рок-музыкантов.`,
    fullText: `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Как начать действовать? Для начала просто соберитесь. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Собрать камни бесконечности легко, если вы прирожденный герой. Достичь успеха помогут ежедневные повторения. Простые ежедневные упражнения помогут достичь успеха. Первая большая ёлка была установлена только в 1938 году. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Он написал больше 30 хитов.`,
    userId: 1,
    categories: [
      `Железо`,
      `Разное`,
      `Программирование`
    ],
    images: {
      path: `/img/forest@1x.jpg`
    },
    comments: [
      {
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили., Мне не нравится ваш стиль. Ощущение, что вы меня поучаете., Согласен с автором!,`,
        userId: 3
      },
      {
        text: `Планируете записать видосик на эту тему? Плюсую, но слишком много буквы!, Это где ж такие красоты?, Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.,`,
        userId: 1
      },
      {
        text: `Это где ж такие красоты?, Хочу такую же футболку :-), Совсем немного..., Мне кажется или я уже читал это где-то?, Планируете записать видосик на эту тему? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете., Давно не пользуюсь стационарными компьютерами. Ноутбуки победили., Согласен с автором!,`,
        userId: 5
      },
      {
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили., Согласен с автором!, Мне не нравится ваш стиль. Ощущение, что вы меня поучаете., Планируете записать видосик на эту тему?`,
        userId: 1
      },
      {
        text: `Планируете записать видосик на эту тему? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.,`,
        userId: 3
      },
      {
        text: `Мне кажется или я уже читал это где-то?, Согласен с автором!, Мне не нравится ваш стиль. Ощущение, что вы меня поучаете., Плюсую, но слишком много буквы!,`,
        userId: 1
      },
      {
        text: `Это где ж такие красоты?, Мне кажется или я уже читал это где-то?, Хочу такую же футболку :-), Планируете записать видосик на эту тему? Плюсую, но слишком много буквы!, Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.,`,
        userId: 4
      }
    ]
  },
  {
    title: `Самый лучший музыкальный альбом этого года`,
    announce: `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Ёлки — это не просто красивое дерево. Это прочная древесина.`,
    fullText: `Ёлки — это не просто красивое дерево. Это прочная древесина. Как начать действовать? Для начала просто соберитесь. Программировать не настолько сложно, как об этом говорят. Из под его пера вышло 8 платиновых альбомов. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Простые ежедневные упражнения помогут достичь успеха. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Первая большая ёлка была установлена только в 1938 году. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Это один из лучших рок-музыкантов. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
    userId: 4,
    categories: [
      `Без рамки`,
      `Деревья`,
      `IT`,
      `За жизнь`
    ],
    images: {
      path: `/img/skyscraper@1x.jpg`
    },
    comments: [
      {
        text: `Совсем немного..., Плюсую, но слишком много буквы!, Согласен с автором!, Хочу такую же футболку :-), Это где ж такие красоты?, Давно не пользуюсь стационарными компьютерами. Ноутбуки победили., Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.,`,
        userId: 1
      }
    ]
  },
  {
    title: `Как перестать беспокоиться и начать жить`,
    announce: `Как начать действовать? Для начала просто соберитесь.`,
    fullText: `Достичь успеха помогут ежедневные повторения. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
    userId: 2,
    categories: [
      `Железо`,
      `Музыка`,
      `Разное`,
      `Без рамки`,
      `За жизнь`,
      `Деревья`,
      `Кино`,
      `IT`
    ],
    images: {
      path: `/img/skyscraper@1x.jpg`
    },
    comments: [
      {
        text: `Мне кажется или я уже читал это где-то?, Планируете записать видосик на эту тему? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете., Согласен с автором!, Плюсую, но слишком много буквы!, Совсем немного..., Это где ж такие красоты?,`,
        userId: 2
      },
      {
        text: `Это где ж такие красоты?, Совсем немного..., Мне кажется или я уже читал это где-то?, Давно не пользуюсь стационарными компьютерами. Ноутбуки победили., Планируете записать видосик на эту тему? Согласен с автором!,`,
        userId: 3
      },
      {
        text: `Мне кажется или я уже читал это где-то?, Давно не пользуюсь стационарными компьютерами. Ноутбуки победили., Планируете записать видосик на эту тему? Хочу такую же футболку :-),`,
        userId: 4
      },
      {
        text: `Это где ж такие красоты?, Хочу такую же футболку :-), Согласен с автором!, Плюсую, но слишком много буквы!, Мне кажется или я уже читал это где-то?,`,
        userId: 5
      }
    ]
  },
  {
    title: `Лучшие рок-музыканты 20-века`,
    announce: `Первая большая ёлка была установлена только в 1938 году.`,
    fullText: `Простые ежедневные упражнения помогут достичь успеха. Из под его пера вышло 8 платиновых альбомов. Ёлки — это не просто красивое дерево. Это прочная древесина. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Золотое сечение — соотношение двух величин, гармоническая пропорция. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Это один из лучших рок-музыкантов. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Программировать не настолько сложно, как об этом говорят.`,
    userId: 5,
    categories: [
      `Деревья`,
      `Разное`,
      `Кино`,
      `За жизнь`
    ],
    images: {
      path: `/img/forest@1x.jpg`
    },
    comments: [
      {
        text: `Совсем немного..., Мне не нравится ваш стиль. Ощущение, что вы меня поучаете., Мне кажется или я уже читал это где-то?, Планируете записать видосик на эту тему? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили., Хочу такую же футболку :-), Плюсую, но слишком много буквы!,`,
        userId: 3
      }
    ]
  }
];

module.exports = {
  roles,
  categories,
  users,
  articles,
};
