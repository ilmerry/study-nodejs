// src/api/user.ts
import express, { Request, Response, Router } from "express";
// express 모듈에서 express, (request, response, router)-> 타입 정의를 위해 불러옴!

const router: Router = express.Router();
interface iMember {
  id: number;
  name: string;
  age: number;
}

router.get("/", (req: Request, res: Response) => {
  const members: iMember[] = [
    {
      id: 1,
      name: "은형",
      age: 23,
    },
    {
      id: 2,
      name: "메리",
      age: 14,
    },
  ];
  return res.status(200).send(members);
});

module.exports = router;
