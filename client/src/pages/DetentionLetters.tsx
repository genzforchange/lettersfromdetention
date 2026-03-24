// Data for Colorado letter cards
const coloradoCards = [
  {
    id: "co-1",
    name: "first name",
    description: (
      <>
        description
        <br />
        ex. mother of 2, cat mom of 9
      </>
    ),
    imgSrc: "/figmaAssets/screenshot-2026-03-18-at-4-03-33-pm-12.png",
    dark: true,
  },
  {
    id: "co-2",
    name: "first name",
    description: (
      <>
        Lorem ipsum <br />
        Lorem ipsum dolor
        <br />
        Lorem ipsum <br />
        Lorem ipsum dolor sit
        <br />
        Lorem ipsum dolor
      </>
    ),
    imgSrc: "/figmaAssets/screenshot-2026-03-18-at-4-03-33-pm-12.png",
    dark: false,
  },
  {
    id: "co-3",
    name: "name",
    description: (
      <>
        Lorem ipsum <br />
        Lorem ipsum dolor
        <br />
        Lorem ipsum <br />
        Lorem ipsum dolor sit
        <br />
        Lorem ipsum dolor
      </>
    ),
    imgSrc: "/figmaAssets/screenshot-2026-03-18-at-4-03-33-pm-12.png",
    dark: false,
  },
  {
    id: "co-4",
    name: "name",
    description: (
      <>
        Lorem ipsum <br />
        Lorem ipsum dolor
        <br />
        Lorem ipsum <br />
        Lorem ipsum dolor sit
        <br />
        Lorem ipsum dolor
      </>
    ),
    imgSrc: "/figmaAssets/screenshot-2026-03-18-at-4-03-33-pm-12.png",
    dark: false,
  },
  {
    id: "co-5",
    name: "name",
    description: (
      <>
        Lorem ipsum <br />
        Lorem ipsum dolor
        <br />
        Lorem ipsum <br />
        Lorem ipsum dolor sit
        <br />
        Lorem ipsum dolor
      </>
    ),
    imgSrc: "/figmaAssets/screenshot-2026-03-18-at-4-03-33-pm-12.png",
    dark: false,
  },
  {
    id: "co-6",
    name: "name",
    description: (
      <>
        Lorem ipsum <br />
        Lorem ipsum dolor
        <br />
        Lorem ipsum <br />
        Lorem ipsum dolor sit
        <br />
        Lorem ipsum dolor
      </>
    ),
    imgSrc: "/figmaAssets/screenshot-2026-03-18-at-4-03-33-pm-12.png",
    dark: false,
  },
];

// Data for Alaska letter cards
const alaskaCards = [
  {
    id: "ak-1",
    name: "name",
    description: (
      <>
        Lorem ipsum <br />
        Lorem ipsum dolor
        <br />
        Lorem ipsum <br />
        Lorem ipsum dolor sit
        <br />
        Lorem ipsum dolor
      </>
    ),
    imgSrc: "/figmaAssets/screenshot-2026-03-18-at-4-03-33-pm-12.png",
    dark: false,
  },
  {
    id: "ak-2",
    name: "name",
    description: (
      <>
        Lorem ipsum <br />
        Lorem ipsum dolor
        <br />
        Lorem ipsum <br />
        Lorem ipsum dolor sit
        <br />
        Lorem ipsum dolor
      </>
    ),
    imgSrc: "/figmaAssets/screenshot-2026-03-18-at-4-03-33-pm-12.png",
    dark: false,
  },
  {
    id: "ak-3",
    name: "name",
    description: (
      <>
        Lorem ipsum <br />
        Lorem ipsum dolor
        <br />
        Lorem ipsum <br />
        Lorem ipsum dolor sit
        <br />
        Lorem ipsum dolor
      </>
    ),
    imgSrc: "/figmaAssets/screenshot-2026-03-18-at-4-03-33-pm-12.png",
    dark: false,
  },
  {
    id: "ak-4",
    name: "name",
    description: (
      <>
        Lorem ipsum <br />
        Lorem ipsum dolor
        <br />
        Lorem ipsum <br />
        Lorem ipsum dolor sit
        <br />
        Lorem ipsum dolor
      </>
    ),
    imgSrc: "/figmaAssets/screenshot-2026-03-18-at-4-03-33-pm-12.png",
    dark: false,
  },
  {
    id: "ak-5",
    name: "name",
    description: (
      <>
        Lorem ipsum <br />
        Lorem ipsum dolor
        <br />
        Lorem ipsum <br />
        Lorem ipsum dolor sit
        <br />
        Lorem ipsum dolor
      </>
    ),
    imgSrc: "/figmaAssets/screenshot-2026-03-18-at-4-03-33-pm-12.png",
    dark: false,
  },
  {
    id: "ak-6",
    name: "name",
    description: (
      <>
        Lorem ipsum <br />
        Lorem ipsum dolor
        <br />
        Lorem ipsum <br />
        Lorem ipsum dolor sit
        <br />
        Lorem ipsum dolor
      </>
    ),
    imgSrc: "/figmaAssets/screenshot-2026-03-18-at-4-03-33-pm-12.png",
    dark: false,
  },
];

// Social icon placeholder squares
const socialIcons = [{ id: "s1" }, { id: "s2" }, { id: "s3" }, { id: "s4" }];

// Reusable letter card component
const LetterCard = ({
  name,
  description,
  imgSrc,
  dark,
}: {
  name: string;
  description: React.ReactNode;
  imgSrc: string;
  dark: boolean;
}) => (
  <div
    className={`flex flex-row w-full h-[322px] ${
      dark ? "bg-black" : "border border-solid border-black"
    }`}
  >
    {/* Photo */}
    <div className="flex-shrink-0 w-[193px] h-[244px] self-center ml-[39px]">
      <img
        className="w-[193px] h-[244px] object-cover"
        alt="Screenshot"
        src={imgSrc}
      />
    </div>
    {/* Text content */}
    <div className="flex flex-col justify-start ml-[25px] pt-[39px]">
      <div
        className={`[font-family:'Montserrat',Helvetica] font-bold text-[34px] tracking-[0] leading-[34px] whitespace-nowrap mb-[10px] ${
          dark ? "text-white" : "text-black"
        }`}
      >
        {name}
      </div>
      <div
        className={`[font-family:'Montserrat',Helvetica] font-normal text-base tracking-[0] leading-[26px] w-[353px] ${
          dark ? "text-white" : "text-black"
        }`}
      >
        {description}
      </div>
    </div>
  </div>
);

export const DetentionLetters = (): JSX.Element => {
  return (
    <div className="bg-white w-full min-w-[1440px] relative">
      {/* Header */}
      <header className="flex flex-row items-center justify-between px-[50px] pt-[75px] pb-0">
        <h1 className="[font-family:'Montserrat',Helvetica] font-bold text-black text-[40px] tracking-[0] leading-10 whitespace-nowrap">
          Letters From Detention
        </h1>
        {/* Search icon + hamburger */}
        <div className="flex flex-row items-center gap-[25px]">
          {/* Search icon */}
          <div className="relative w-[31px] h-[31px]">
            <div className="absolute top-[5px] left-[5px] w-[22px] h-[22px] rounded-[10.96px] border-[3px] border-solid border-black -rotate-45" />
            <img
              className="absolute top-[21px] left-5 w-[9px] h-[9px]"
              alt="Line"
              src="/figmaAssets/line-12.svg"
            />
          </div>
          {/* Hamburger menu */}
          <div className="flex flex-col gap-[4.5px] w-[25px] h-[15px]">
            <img
              className="w-[25px] h-[3px]"
              alt="Line"
              src="/figmaAssets/line-15.svg"
            />
            <img
              className="w-[25px] h-[3px]"
              alt="Line"
              src="/figmaAssets/line-15.svg"
            />
            <img
              className="w-[25px] h-[3px]"
              alt="Line"
              src="/figmaAssets/line-15.svg"
            />
          </div>
        </div>
      </header>

      {/* Divider under header */}
      <div className="mx-[50px] mt-[10px]">
        <img
          className="w-full h-px"
          alt="Line"
          src="/figmaAssets/line-11.svg"
        />
      </div>

      {/* Hero section with decorative images and quote */}
      <section
        className="relative w-full overflow-hidden"
        style={{ minHeight: "585px" }}
      >
        {/* Decorative flower images */}
        <img
          className="absolute top-[9px] left-0 w-[272px] h-[311px] object-cover"
          alt="Element"
          src="/figmaAssets/4-626.png"
        />
        <img
          className="absolute top-[320px] left-0 w-[199px] h-[493px] object-cover"
          alt="Element"
          src="/figmaAssets/9-10.png"
        />
        <img
          className="absolute top-[24px] left-[1225px] w-[177px] h-[172px] object-cover"
          alt="Element"
          src="/figmaAssets/3-323664.png"
        />
        <img
          className="absolute top-[228px] left-[1170px] w-[235px] h-[388px] object-cover"
          alt="Element"
          src="/figmaAssets/2-3.png"
        />
        <img
          className="absolute top-[161px] left-[1288px] w-[152px] h-[363px] object-cover"
          alt="Element"
          src="/figmaAssets/7-2.png"
        />
        <img
          className="absolute top-[326px] left-[109px] w-[379px] h-[260px] object-cover"
          alt="Element"
          src="/figmaAssets/8-96.png"
        />
        <img
          className="absolute top-[295px] left-[668px] w-[382px] h-[385px] object-cover"
          alt="Element"
          src="/figmaAssets/1-10.png"
        />
        <img
          className="absolute top-[323px] left-[963px] w-[267px] h-[300px] object-cover"
          alt="Element"
          src="/figmaAssets/6-1.png"
        />
        <img
          className="absolute top-[323px] left-[457px] w-[268px] h-[286px] object-cover"
          alt="Element"
          src="/figmaAssets/5-1.png"
        />

        {/* Quote text */}
        <div className="relative z-10 mx-auto w-[1060px] pt-[117px] pb-[117px] [font-family:'Montserrat',Helvetica] font-bold text-black text-[46px] text-center tracking-[0] leading-[55px]">
          LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. IN VITAE URNA
          NON ORCI TRISTIQUE TEMPOR. INTEGER MALESUADA MOLLIS FELIS.
        </div>
      </section>

      {/* Colorado Section */}
      <section className="px-[50px] mt-[10px]">
        <h2 className="[font-family:'Montserrat',Helvetica] font-bold text-black text-[40px] tracking-[0] leading-10 whitespace-nowrap mb-[10px]">
          Colorado
        </h2>
        <img
          className="w-full h-px mb-[51px]"
          alt="Line"
          src="/figmaAssets/line-11.svg"
        />
        {/* 2-column grid of cards */}
        <div className="grid grid-cols-2 gap-x-[50px] gap-y-[50px]">
          {coloradoCards.map((card) => (
            <LetterCard
              key={card.id}
              name={card.name}
              description={card.description}
              imgSrc={card.imgSrc}
              dark={card.dark}
            />
          ))}
        </div>
      </section>

      {/* Alaska Section */}
      <section className="px-[50px] mt-[100px]">
        <h2 className="[font-family:'Montserrat',Helvetica] font-bold text-black text-[40px] tracking-[0] leading-10 whitespace-nowrap mb-[10px]">
          Alaska
        </h2>
        <img
          className="w-full h-px mb-[51px]"
          alt="Line"
          src="/figmaAssets/line-11.svg"
        />
        {/* 2-column grid of cards */}
        <div className="grid grid-cols-2 gap-x-[50px] gap-y-[50px]">
          {alaskaCards.map((card) => (
            <LetterCard
              key={card.id}
              name={card.name}
              description={card.description}
              imgSrc={card.imgSrc}
              dark={card.dark}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black mt-[100px] h-[100px] flex flex-row items-center justify-between px-[39px]">
        <span className="[font-family:'Montserrat',Helvetica] font-normal text-white text-[26px] tracking-[0] leading-[26px] whitespace-nowrap">
          share on social
        </span>
        {/* Social icon squares */}
        <div className="flex flex-row items-center gap-[15px]">
          {socialIcons.map((icon) => (
            <div key={icon.id} className="w-[22px] h-[22px] bg-white" />
          ))}
        </div>
      </footer>
    </div>
  );
};
