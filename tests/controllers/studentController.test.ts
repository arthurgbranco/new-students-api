import app from "..";
import supertest from "supertest";

jest.mock("../../src/db/students", () => {
  const originalModule = jest.requireActual("../../src/db/students");

  return {
    _esModule: true,
    ...originalModule,
    getStudents: jest.fn(() => {
      return Promise.resolve([
        {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
          city: "Belo Horizonte",
          birth: new Date("11/13/1999"),
        },
      ]);
    }),
    addStudent: jest.fn(() => {
      return Promise.resolve({
        id: 2,
        name: "John Doe 2",
        email: "john.doe.2@example.com",
        city: "Belo Horizonte",
        birth: new Date("11/13/1999").toISOString(),
      });
    }),
    updateStudent: jest.fn(() => {
      return Promise.resolve();
    }),
    deleteStudent: jest.fn(() => {
      return Promise.resolve();
    }),
  };
});

describe("Test student requests", () => {
  it("should return the example student", async () => {
    await supertest(app)
      .get("/students")
      .expect(200)
      .then((res) =>
        expect(res.body).toMatchObject([
          {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            city: "Belo Horizonte",
            birth: new Date("11/13/1999").toISOString(),
          },
        ])
      );
  });

  it("should create a new student", async () => {
    const newStudent = {
      name: "John Doe 2",
      email: "john.doe.2@example.com",
      city: "Belo Horizonte",
      birth: new Date("11/13/1999").toISOString(),
    };

    await supertest(app)
      .post("/students")
      .send(newStudent)
      .then((res) => expect(res.body).toMatchObject({ id: 2, ...newStudent }));
  });

  it("should update a student", async () => {
    const newStudent = {
      name: "Aylton",
    };

    await supertest(app)
      .put(`/students/${1}`)
      .send(newStudent)
      .expect(200)
      .then((res) => expect(res.body).toBe("ok"));
  });

  it("should delete a student", async () => {
    await supertest(app)
      .delete(`/students/${1}`)
      .expect(200)
      .then((res) => expect(res.body).toBe("ok"));
  });
});
