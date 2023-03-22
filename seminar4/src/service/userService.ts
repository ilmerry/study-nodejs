import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//* 유저 생성
const createUser = async (name: string, age: number, email: string) => {
  // prisma 사용해서 디비에 정보 저장
  // 프리즈마는 기본적으로 promise 방식임
  const data = await prisma.user.create({
    data: {
      name,
      age,
      email,
    },
  });

  return data;
};

//* 유저 전체 조회
const getAllUser = async () => {
  // findFirst: 조건에 만족하는 것들 중 맨처음꺼
  // findMany: 조건에 만족하는 것 모두
  // findUnique: id 등으로 걸러낼때
  const data = await prisma.user.findMany();
  return data;
};

//* 유저 정보 업데이트
const updateUser = async (userId: number, name: string) => {
  // updateMany: 대량의 업데이트
  const data = await prisma.user.update({
    // 바꿀 데이터
    where: {
      id: userId,
    },
    // 이름 바꿔주기
    data: {
      name,
    },
  });

  return data;
};

//* 유저 삭제
const deleteUser = async (userId: number) => {
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });
};

//* userId로 유저 조회
const getUserById = async (userId: number) => {
  const user = await prisma.user.findUnique({
    // 조건 걸어서 필터링
    where: {
      id: userId,
    },
  });

  return user;
};

const userService = {
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
  getUserById,
};

export default userService;
