const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
    beforeEach(() => Recipe.sync({ force: false }));
  describe('Validators', () => {
    describe('Title', () => {
      it('Deberia arrojar un error si el title es null', async() => {
        try {
            await Recipe.create({summary: 'Pasta a base de papa y harina'});
        } catch (err) {
            expect(err.message)
        }
      });
    });

    describe('Summary', () => {
        it('Deberia arrojar un error si el summary es null', async() => {
          try {
              await Recipe.create({title: 'Ñoquis'});
          } catch (err) {
              expect(err.message)
          }
        });
    });

    describe('Aggregate Likes', () => {
        it('No deberia poder colocar un string en aggregateLikes', (done) => {
            Recipe.create({
                    title: 'Ñoquis',
                    summary: 'Pasta a base de papa y harina',
                    aggregateLikes: 'This is invalid data',
                })
                .then(() => done('No debería haberse creado'))
                .catch(() => done());
        });
    });

    describe('Health Score', () => {
        it('No deberia poder colocar un string en healthScore', (done) => {
            Recipe.create({
                    title: 'Ñoquis',
                    summary: 'Pasta a base de papa y harina',
                    healthScore: 'This is invalid data',
                })
                .then(() => done('No debería haberse creado'))
                .catch(() => done());
        });
    });
    
  });
});

