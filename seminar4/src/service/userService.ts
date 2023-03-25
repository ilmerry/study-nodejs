import { PrismaClient } from "@prisma/client";
import { compare, genSalt, hash } from "bcryptjs";
import { sc } from "../constants";
import { UserCreateDTO } from "../interfaces/UserCreateDTO";
import { UserSignInDTO } from "../interfaces/UserSignInDTO";
const prisma = new PrismaClient();

//* 유저 생성
const createUser = async (userCreateDto: UserCreateDTO) => {
  //? 넘겨받은 password를 bcrypt의 도움을 받아 암호화
  const salt = await genSalt(10); //^ 매우 작은 임의의 랜덤 텍스트 salt
  const password = await hash(userCreateDto.password, salt); //^ 위에서 랜덤을 생성한 salt를 이용해 암호화

  const data = await prisma.user.create({
    data: {
      name: userCreateDto?.name,
      age: userCreateDto?.age,
      email: userCreateDto.email,
      password,
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

//* 로그인
const signIn = async (userSignInDto: UserSignInDTO) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: userSignInDto.email,
      },
    });
    if (!user) return null;

    //? bcrypt가 DB에 저장된 기존 password와 넘겨 받은 password를 대조하고,
    //? match false시 401을 리턴
    const isMatch = await compare(userSignInDto.password, user.password);
    if (!isMatch) return sc.UNAUTHORIZED;

    return user.id;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const userService = {
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
  getUserById,
  signIn,
};

export default userService;
