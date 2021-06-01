import { rest } from 'msw';

export const handlers = [
  rest.get(/search/i, (req, res, ctx) => {
    return res(
      ctx.json({
        objects: [
          {
            package: {
              name: 'react',
            },
          },
        ],
      })
    );
  }),
];
