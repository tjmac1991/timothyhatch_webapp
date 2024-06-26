import ReactLogo from "../assets/icons/reactLogo";
import AwsLogo from "../assets/icons/awsLogo";
import JavascriptLogo from "../assets/icons/javascriptLogo";
import VueLogo from "../assets/icons/vueLogo";
import AngularLogo from "../assets/icons/angularLogo";
import PythonLogo from "../assets/icons/pythonLogo";
import PostgresqlLogo from "../assets/icons/postgresqlLogo";
import NodejsLogo from "../assets/icons/nodejsLogo";
import LuaLogo from "../assets/icons/luaLogo";
import JestLogo from "../assets/icons/jestLogo";
import JavaLogo from "../assets/icons/javaLogo";
import MongoDbLogo from "../assets/icons/mongodbLogo";
import TypescriptLogo from "../assets/icons/typescriptLogo";

type tSkillChip = {
    name: string;
    CustomIcon?: JSX.Element;
    link?: string
}

export const skillsList: tSkillChip[] = [
    {
        name: 'Typescript',
        CustomIcon: <TypescriptLogo className="About__javascript-logo" />,
        link: 'https://www.typescriptlang.org/',
    },
    {
        name: 'Javacript',
        CustomIcon: <JavascriptLogo className="About__javascript-logo" />,
        link: 'https://www.javascript.com/',
    },
    {
        name: 'Java',
        CustomIcon: <JavaLogo />,
        link: 'https://www.oracle.com/java/technologies/downloads/',
    },
    {
        name: 'Python',
        CustomIcon: <PythonLogo />,
        link: 'https://www.python.org/',
    },
    {
        name: 'C#',
        link: 'https://learn.microsoft.com/en-us/dotnet/csharp/',
    },
    {
        name: 'Lua',
        CustomIcon: <LuaLogo />,
        link: 'https://www.lua.org/',
    },
    {
        name: 'Rapid',
        link: 'https://en.wikipedia.org/wiki/RAPID#:~:text=RAPID%20is%20a%20high%2Dlevel,superseding%20the%20ARLA%20programming%20language.',
    },
    {
        name: 'React',
        CustomIcon: <ReactLogo className="About__react-logo" />,
        link: 'https://reactjs.org',
    },
    {
        name: 'AWS',
        CustomIcon: <AwsLogo />,
        link: 'https://aws.amazon.com/',
    },
    {
        name: 'Vue',
        CustomIcon: <VueLogo className="About__vue-logo" />,
        link: 'https://vuejs.org/',
    },
    {
        name: 'Angular',
        CustomIcon: <AngularLogo className="About__angular-logo" />,
        link: 'https://angular.io/',
    },
    {
        name: 'Junit',
        link: 'https://junit.org/junit5/',
    },
    {
        name: 'Jest',
        CustomIcon: <JestLogo className="About__jest-logo" />,
        link: 'https://jestjs.io/',
    },
    {
        name: 'Karma',
        link: 'https://karma-runner.github.io/latest/index.html',
    },
    {
        name: 'Pytest',
        link: 'https://docs.pytest.org/en/8.0.x/',
    },
    {
        name: 'Playwright',
        link: 'https://playwright.dev/',
    },
    {
        name: 'Cypress',
        link: 'https://www.cypress.io/',
    },
    {
        name: 'Node.js',
        CustomIcon: <NodejsLogo />,
        link: 'https://nodejs.org/en',
    },
    {
        name: 'PostgreSQL',
        CustomIcon: <PostgresqlLogo />,
        link: 'https://www.postgresql.org/',
    },
    {
        name: 'MongoDb',
        CustomIcon: <MongoDbLogo />,
        link: 'https://www.mongodb.com/',
    },
    {
        name: 'MSSQL',
        link: 'https://www.microsoft.com/en-us/sql-server/developer-tools',
    },
    {
        name: 'SSMS',
        link: 'https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16',
    },
    {
        name: 'HTML',
        link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    },
    {
        name: 'CSS',
        link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    },
    {
        name: 'Git',
        link: 'https://git-scm.com/',
    },
    {
        name: 'Vim',
        link: 'https://www.vim.org/',
    },
];
