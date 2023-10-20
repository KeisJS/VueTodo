import testServer from './src/utils/test/setupServer';

beforeAll(() => testServer.listen())

afterEach(() => testServer.resetHandlers())

afterAll(() => testServer.close())
