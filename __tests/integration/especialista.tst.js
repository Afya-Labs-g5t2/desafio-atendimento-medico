const request = require('supertest');
const app = require("../../src/app");
require("../../src/database");

let token;

beforeAll(async() => {
    await request(app)
      .post('/usuarios')
      .send({
        login: "Afya30",
        senha: "afyasenha30",
        nome: "afya30"
    })
    
    });

  beforeEach( (done) => {
   request(app)
      .post('/session')
      .send({
        login: "Afya30",
        senha: "afyasenha30",
        nome: "afya30"
    })
      .end((err, response) => {
        token = response.body.token; // save the token!
        done();
      });
  });


  test("get especialistas", async() => {

    const response = await request(app)
        .get("/especialistas")
        .set("Authorization", `Bearer ${token}`)
       
    expect(response.statusCode).toEqual(200);

})


describe("Especialista", () => {

      beforeAll(async() => {
        await request(app)
         .post("/profissoes")
         .set("Authorization", `Bearer ${token}`)
         .send({
             id: 2,
             profissao: 'clinico geral'
         });
       });
    
      
    afterAll(async() => {
        await request(app)
         .del("/profissoes/2")
         .set("Authorization", `Bearer ${token}`)
    });
   

    it("post novo especialista", async() => {
       
        const response = await request(app)
        
            .post('/especialistas')
            .set("Authorization", `Bearer ${token}`)
            .send({
                id:1,
                registro: '194527-SP',
                nome: 'Aarao Andrade Napoleao Lima',
                celular: '11922334458',
                telefone: '11922234567',
                email: 'araoo@example.com',
                id_profissao: 2   
            });
        console.log(response.error)
        expect(response.ok).toBeTruthy();
        expect(response.id !== 0).toBe(true)  
    })

    it("ERROR post novo especialista", async() => {

        const response = await request(app)
            .post("/especialistas")
            .set("Authorization", `Bearer ${token}`)
            .send({
                registro: null,
                nome: null,
                celular: '11922334459',
                telefone: '11922234567',
                email: 'araoo@example.com',
            });

        expect(response.statusCode).toEqual(400);
        expect(response.body).toHaveProperty("error");
        
    })

    it("get especialista pelo ID", async() => {

        const response = await request(app)
            .get("/especialistas/1")
            .set("Authorization", `Bearer ${token}`)
           
        expect(response.statusCode).toEqual(200);
        })


    // it(" ERROR get profissao pelo ID", async() => {

    //         const response = await request(app)
    //             .get("/profissoes/1")
               
    //             expect(response.statusCode).toEqual(400);
    //             expect(response.body).toHaveProperty("error");
    //     })




    it("update especialista", async() => {

            const response = await request(app)
                .put("/especialistas/1")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    registro: '194527-SP',
                    nome: 'Aarao Andrade Napoleao Lima',
                    celular: '11922335555',
                    telefone: '11922234567',
                    email: 'araoo@example.com',
                    id_profissao: 2
                });
    
            expect(response.ok).toBeTruthy();
            expect(response.statusCode).toEqual(200);
            
        })

    
        it("ERROR update especialista", async() => {

            const response = await request(app)
                .put("/especialistas/1")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    registro: null,
                    nome: null,
                    celular: '11922331111',
                    tel: '1192220000',
                    email: 'araoo@example.com',
                });
    
                expect(response.statusCode).toEqual(400);
                expect(response.body).toHaveProperty("error");
            
        })




        it("delete especialista", async() => {

            const response = await request(app)
                .del("/especialistas/1")
                .set("Authorization", `Bearer ${token}`)
               
                expect(response.statusCode).toEqual(200);
                expect(response.ok).toBeTruthy();
            
        })
    
        it("ERROR delete especialista", async() => {

            const response = await request(app)
                .del("/especialistas/0")
                .set("Authorization", `Bearer ${token}`)
               
                expect(response.statusCode).toEqual(400);
                expect(response.body).toHaveProperty("error");
            
            
        })
        
    

})