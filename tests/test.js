

describe('TESTING DATABASE INSERT/RETRIEVE VALUES', function() {

        it('Testing Insert @watch', function () {
            //   browser.url('http://localhost:3000');
            //   expect(browser.getTitle()).to.equal('Google');


            var insertDB = () => {
                return Donors.insert({
                            first_name : "first_name",
                            last_name : "last_name",
                            email : "email@domain.com",
                            phone : 111,
                            ipAddress : "196.233.1.22",
                            blood : "O-",
                            lat : "32.00393933",
                            lng : "32.73782933",
                       })
            }

            var userId = server.execute(insertDB)
            // console.log('userId',userId);
        })



          it('reading all values from the DB @watch', function(){
              var readAll = ()=>{
                  return Donors.find().fetch()
              }

              var all_users = server.execute(readAll)
          })
  })
