import { Bone, Liver, Meat, Nuts, Offal, Veges, Fruit } from "../assets";
import { ration_1, ration_2, ration_3, ration_4 } from "../assets";
import {
    heartBeat,
    leaf,
    rocket,
    smiley,
    box,
    phone,
    clock,
    heartGet,
} from "../assets";

export const navLinks: {
    id: string;
    tittle: string;
    linkTo: string;
}[] = [
    {
        id: "BARF",
        tittle: "BARF",
        linkTo: "#",
    },
    {
        id: "Рационы",
        tittle: "Рационы",
        linkTo: "#",
    },
    {
        id: "ZOOOV",
        tittle: "ZOOOV",
        linkTo: "#",
    },
    {
        id: "О нас",
        tittle: "О нас",
        linkTo: "#",
    },
    {
        id: "Доставка",
        tittle: "Доставка",
        linkTo: "#",
    },
    {
        id: "FAQ",
        tittle: "FAQ",
        linkTo: "#",
    },
    {
        id: "Контакты",
        tittle: "Контакты",
        linkTo: "#",
    },
];

export const heroText: {
    header: string;
    subHeader: string;
    btn: string;
} = {
    header: "Питание, которое полюбит ваш питомец",
    subHeader: "Натуральные рационы питания для собак по системе BARF",
    btn: "Выбрать рацион",
};

export const subHeroText: {
    header: string;
    text: string;
    header2: string;
    dots: string[];
    portions: {
        header: string;
        portions: { text: string; icon: string }[];
    }[];
} = {
    header: "Что такое BARF",
    text: "BARF (Biologically Appropriate Raw Food) — система питания собак, основанная на сырых натуральных продуктах. Такой рацион максимально приближен к естественному пищевому поведению хищников, а значит биологически правилен. ",
    header2: "После перехода на питание по системе BARF у собак:",
    dots: [
        "Нормализуется пищеварение",
        "Проходят аллергические реакции",
        "Прекращается образование зубного камня",
        "Появляется больше энергии",
        "Увеличивается продолжительность жизни",
    ],
    portions: [
        {
            header: "Для взрослых",
            portions: [
                { text: "Мясо – 70%", icon: Meat },
                { text: "кости – 10%", icon: Bone },
                { text: "овощи – 7%", icon: Veges },
                { text: "печень – 5%", icon: Liver },
                { text: "субпродукты – 5%", icon: Offal },
                { text: "Семена/Орехи – 2%", icon: Nuts },
                { text: "фрукты – 1%", icon: Fruit },
            ],
        },
        {
            header: "Для Щенков",
            portions: [
                { text: "Мясо – 58%", icon: Meat },
                { text: "кости – 17%", icon: Bone },
                { text: "овощи – 7%", icon: Veges },
                { text: "печень – 7%", icon: Liver },
                { text: "субпродукты – 7%", icon: Offal },
                { text: "Семена/Орехи – 3%", icon: Nuts },
                { text: "фрукты – 1%", icon: Fruit },
            ],
        },
    ],
};

const buttonText: string = "Заказать";
export const rations: {
    header: {
        headerText: string;
        subHeader: string;
    };
    portions: {
        image: string;
        header: string;
        subHeader: string;
        text: string;
        mass: string;
        buttonText: string;
    }[];
} = {
    header: {
        headerText: "Рационы ZOOOV",
        subHeader:
            "Система питания взрослой собаки не подойдет для щенка, поэтому мы создали разные по составу рационы ZOOOV. Вы сможете заказать полноценное питание исходя из возраста, веса и даже вкусовых предпочтений вашего друга. ZOOOV  заботится о каждой собаке.",
    },
    portions: [
        {
            image: ration_1,
            header: "Для взрослых собак",
            subHeader: "Индейка/Говядина",
            text: "Подходит для ежедвеного кормления. Богат животными белками и Омега-3.",
            mass: "700г / 500г / 300г / 150г / 100г",
            buttonText: buttonText,
        },
        {
            image: ration_2,
            header: "Для щенков",
            subHeader: "Индейка/Говядина",
            text: "Подходит для ежедвеного кормления. Богат животными белками и Омега-3.",
            mass: "700г / 500г / 300г / 150г / 100г",
            buttonText: buttonText,
        },
        {
            image: ration_3,
            header: "Для взрослых собак",
            subHeader: "Баранина/Кролик",
            text: "Подходит для ежедвеного кормления. Богат животными белками и Омега-3.",
            mass: "700г / 500г / 300г / 150г / 100г",
            buttonText: buttonText,
        },
        {
            image: ration_4,
            header: "Для щенков",
            subHeader: "Баранина/Кролик",
            text: "Подходит для ежедневного кормления. Богат животными белками и Омега-3.",
            mass: "700г / 500г / 300г / 150г / 100г",
            buttonText: buttonText,
        },
    ],
};

export const rationCalc: {
    text: String;
    buttonText: String;
} = {
    text: "Рассчитаем в каком количестве нужно кормить вашего питомца рационами Zooov",
    buttonText: "Расчитать",
};

export const whyZoov: {
    headerText: string;
    list: {
        image: string;
        header: string;
        subHeader: string;
    }[];
} = {
    headerText: "Почему ZOOOV",
    list: [
        {
            image: leaf,
            header: "Натурально",
            subHeader:
                "Все продукты тщательно отбираем у проверенных поставщиков.",
        },
        {
            image: heartBeat,
            header: "Здорово",
            subHeader:
                "Система питания, которая продлевает жизнь вашего питомца.",
        },
        {
            image: rocket,
            header: "Быстро",
            subHeader:
                "Сделайте заказ на сайте и с вами свяжется  наш менеджер для уточнения деталей.",
        },
        {
            image: smiley,
            header: "Удобно",
            subHeader:
                "Достаточно разморозить порцию ZOOOV,  удалить отрывную крышку с лотка и обед для вашего питомца готов.",
        },
    ],
};

export const LoveCare: {
    header: string;
    text: string[];
} = {
    header: "С заботой и любовью от Zooov",
    text: [
        "Мы сами владельцы собак и знаем, как важно правильное и качественное питание для долгой и счастливой жизни вашего питомца. Для нас ZOOOV это не просто бизнес, это наш вклад в повышение качества жизни всех собак.",
        "Мы знаем, как правильно подобрать и переработать мясо, субпродукты, овощи и фрукты, чтобы питание вашего питомца было максимально сбалансированным и полезным.",
        "Обычного сырого мяса из магазина будет недостаточно для полноценного питания собаки. ZOOOV — экономия времени, вам не придется искать необходимые составляющие для рациона.",
        "Мы сами отбираем мясо, кости, легкие, печень и другие говяжьи, кроличьи и птичьи субпродукты у проверенных поставщиков. Закупаем органические овощи и используем разнообразные масла, такие как конопляное и льняное.",
        "ZOOOV — это удобно, мы доставляем готовый рацион на две недели уже смешанным, расфасованным и упакованным в порционные лотки,готовыми к заморозке. За два часа до кормления достаточно переместить контейнер из морозилки в холодильник для ПРАВИЛЬНОЙ разморозки.",
    ],
};

export const howGet: {
    header: string;
    list: {
        icon: string;
        header: string;
        text: string;
    }[];
} = {
    header: "Как получить ZOOOV?",
    list: [
        {
            icon: box,
            header: "Закажите рацион",
            text: "Выберите рацион для своей собаки. Если не знаете сколько и какой –",
        },
        {
            icon: phone,
            header: "Подтвердите заказ",
            text: "Мы свяжемся с вами для подтверждения заказа и уточнения деталей.",
        },
        {
            icon: clock,
            header: "Ожидайте доставки",
            text: "Привозим заказ на следующий день. По СПб – 350₽, при заказе от 3 500₽ – бесплатно. Лен. область – по договоренности.",
        },
        {
            icon: heartGet,
            header: "Радуйте своего питомца",
            text: "Просто разморозьте рацион: при комнатной температуре – 3 часа, в холодильнике – 12-15 часов.",
        },
    ],
};

export const faq: {
    header: string;
    list: {
        header: string;
        text: string;
    }[];
} = {
    header: "Частые вопросы",
    list: [
        {
            header: "Не опасны ли бактерии, которые находятся в сыром мясе?",
            text: "У здоровых собак отличная иммунная система, готовая ко всем видам бактерий. Рацион BARF как раз укрепит иммунитет вашей собаки и защитит ее от влияния бактерий, которые находятся на улице или даже в вашем доме.",
        },
        {
            header: "Надо ли давать дополнительно витамины к рациону BARF?",
            text: "У здоровых собак отличная иммунная система, готовая ко всем видам бактерий. Рацион BARF как раз укрепит иммунитет вашей собаки и защитит ее от влияния бактерий, которые находятся на улице или даже в вашем доме.",
        },
        {
            header: "А если моя собака уже давно питается промышленным кормом и у нее нет проблем со здоровьем?",
            text: "У здоровых собак отличная иммунная система, готовая ко всем видам бактерий. Рацион BARF как раз укрепит иммунитет вашей собаки и защитит ее от влияния бактерий, которые находятся на улице или даже в вашем доме.",
        },
        {
            header: "Можно ли смешивать натуральный корм и корм промышленного производства?",
            text: "У здоровых собак отличная иммунная система, готовая ко всем видам бактерий. Рацион BARF как раз укрепит иммунитет вашей собаки и защитит ее от влияния бактерий, которые находятся на улице или даже в вашем доме.",
        },
        {
            header: "Могу ли я сам составить для своей собаки рацион по системе BARF?",
            text: "У здоровых собак отличная иммунная система, готовая ко всем видам бактерий. Рацион BARF как раз укрепит иммунитет вашей собаки и защитит ее от влияния бактерий, которые находятся на улице или даже в вашем доме.",
        },
        {
            header: "Присутствует ли в ZOOOV рационах рыба?",
            text: "У здоровых собак отличная иммунная система, готовая ко всем видам бактерий. Рацион BARF как раз укрепит иммунитет вашей собаки и защитит ее от влияния бактерий, которые находятся на улице или даже в вашем доме.",
        },
        {
            header: "Как перевести питомца на натуральное питание?",
            text: "У здоровых собак отличная иммунная система, готовая ко всем видам бактерий. Рацион BARF как раз укрепит иммунитет вашей собаки и защитит ее от влияния бактерий, которые находятся на улице или даже в вашем доме.",
        },
        {
            header: "Как готовить рацион ZOOOV?",
            text: "У здоровых собак отличная иммунная система, готовая ко всем видам бактерий. Рацион BARF как раз укрепит иммунитет вашей собаки и защитит ее от влияния бактерий, которые находятся на улице или даже в вашем доме.",
        },
        {
            header: "При переходе на рацион ZOOOV у собаки начались проблемы с ЖКТ. Это нормально?",
            text: "У здоровых собак отличная иммунная система, готовая ко всем видам бактерий. Рацион BARF как раз укрепит иммунитет вашей собаки и защитит ее от влияния бактерий, которые находятся на улице или даже в вашем доме.",
        },
    ],
};

export const portionsCalc = {
    header: "Рассчет рациона",
    text: "Заполните информацию и мы свяжемся с вами, чтобы подсказать с подбором рациона для вашего хвостика. Или напишите нам в мессендерах WhatsApp и Telegram.",
    radioButtons: ["Взрослая собака", "Щенок"],
};

export const dashBopardNavLink: {
    title: string;
    type: string;
    linkTo: string;
}[] = [
    {
        title: "Продукция",
        type: "products",
        linkTo: "/dashboard?menu=products",
    },
    {
        title: "Вопрос-Ответ",
        type: "questions",
        linkTo: "/dashboard?menu=questions",
    },
    {
        title: "Заказы",
        type: "orders",
        linkTo: "/dashboard?menu=orders",
    },
];
