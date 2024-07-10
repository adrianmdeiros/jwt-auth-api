"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_express_async_errors = require("express-async-errors");
var import_express4 = __toESM(require("express"));

// src/app/api/routes/index.ts
var import_express3 = require("express");

// src/app/api/routes/user.routes.ts
var import_express = require("express");

// src/app/api/controllers/user-controller.ts
var import_http_status_codes2 = require("http-status-codes");

// src/app/domain/services/create-user-service.ts
var import_bcryptjs = require("bcryptjs");

// src/app/database/index.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/app/domain/repositories/user-repository.ts
var UserRepository = class {
  constructor(db) {
    this.db = db;
  }
  async save(user) {
    const savedUser = await this.db.user.create({
      data: user,
      select: {
        id: true,
        email: true
      }
    });
    return savedUser;
  }
  async findBy(email) {
    const user = await this.db.user.findUnique({
      where: {
        email
      }
    });
    return user;
  }
};

// src/app/domain/services/create-user-service.ts
var import_http_status_codes = require("http-status-codes");

// src/app/domain/services/find-user-by-email-service.ts
var FindUserByEmailService = class {
  async execute(email) {
    const userRepository = new UserRepository(prisma);
    const user = await userRepository.findBy(email);
    return user;
  }
};

// src/app/api/helpers/APIError.ts
var APIError = class extends Error {
  statusCode;
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
};

// src/app/domain/services/create-user-service.ts
var CreateUserService = class {
  async execute({ email, password }) {
    if (!email || !password) {
      throw new APIError("Email and password are required.", import_http_status_codes.StatusCodes.UNAUTHORIZED);
    }
    const findByEmail = new FindUserByEmailService();
    const user = await findByEmail.execute(email);
    if (user) {
      throw new APIError("User already exists", import_http_status_codes.StatusCodes.CONFLICT);
    }
    const userRepository = new UserRepository(prisma);
    const hashPassword = (0, import_bcryptjs.hashSync)(password, 8);
    const newUser = await userRepository.save({ email, password: hashPassword });
    return {
      id: newUser.id,
      email: newUser.email
    };
  }
};

// src/app/api/controllers/user-controller.ts
var UserController = class {
  async create(req, res) {
    try {
      const { email, password } = req.body;
      const createUser = new CreateUserService();
      const newUser = await createUser.execute({ email, password });
      return res.status(import_http_status_codes2.StatusCodes.CREATED).json(newUser);
    } catch (err) {
      return res.status(err.statusCode).json({ error: err.message });
    }
  }
  async read(req, res) {
    res.send({ message: "You are allowed to see this just because u have a token" });
  }
};

// src/app/api/middlewares/ensure-auth.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));

// src/app/config/auth.ts
var auth_default = {
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRATION
  }
};

// src/app/api/middlewares/ensure-auth.ts
var import_http_status_codes3 = require("http-status-codes");
var ensureAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(import_http_status_codes3.StatusCodes.UNAUTHORIZED).json({ error: "Authorization is required" });
  }
  const token = authorization.replace("Bearer", "").trim();
  try {
    const { secret } = auth_default.jwt;
    const data = import_jsonwebtoken.default.verify(token, secret);
    const { id } = data;
    req.userId = id;
    return next();
  } catch {
    return res.status(import_http_status_codes3.StatusCodes.UNAUTHORIZED).json({ error: "Invalid token" });
  }
};

// src/app/api/middlewares/validate-email.ts
var import_http_status_codes4 = require("http-status-codes");
var import_validator = __toESM(require("validator"));
var validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email || !import_validator.default.isEmail(email)) {
    return res.status(import_http_status_codes4.StatusCodes.BAD_REQUEST).json({ error: "Invalid email format." });
  }
  next();
};

// src/app/api/routes/user.routes.ts
var userRouter = (0, import_express.Router)();
var userController = new UserController();
userRouter.post("/api/users", validateEmail, userController.create);
userRouter.get("/api/users", ensureAuth, userController.read);
var user_routes_default = userRouter;

// src/app/api/routes/auth.routes.ts
var import_express2 = require("express");

// src/app/domain/services/auth-user-service.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
var import_bcryptjs2 = require("bcryptjs");
var import_http_status_codes5 = require("http-status-codes");
var AuthUserService = class {
  async execute({ email, password }) {
    if (!email || !password) {
      throw new APIError("Email and password are required.", import_http_status_codes5.StatusCodes.UNAUTHORIZED);
    }
    const findByEmail = new FindUserByEmailService();
    const user = await findByEmail.execute(email);
    if (!user) {
      throw new APIError("Invalid email", import_http_status_codes5.StatusCodes.UNAUTHORIZED);
    }
    const passwordMatched = await (0, import_bcryptjs2.compare)(password, user.password);
    if (!passwordMatched) {
      throw new APIError("Invalid password", import_http_status_codes5.StatusCodes.UNAUTHORIZED);
    }
    const { secret, expiresIn } = auth_default.jwt;
    const token = import_jsonwebtoken2.default.sign({ id: user.id }, secret, { expiresIn });
    return {
      user: {
        id: user.id,
        email
      },
      token
    };
  }
};

// src/app/api/controllers/auth-controller.ts
var import_http_status_codes6 = require("http-status-codes");
var AuthController = class {
  async authenticate(req, res) {
    try {
      const { email, password } = req.body;
      const authenticateUser = new AuthUserService();
      const response = await authenticateUser.execute({ email, password });
      return res.status(import_http_status_codes6.StatusCodes.OK).json(response);
    } catch (err) {
      return res.status(err.statusCode).json({ error: err.message });
    }
  }
};

// src/app/api/routes/auth.routes.ts
var authRouter = (0, import_express2.Router)();
var authController = new AuthController();
authRouter.post("/api/auth", authController.authenticate);
var auth_routes_default = authRouter;

// src/app/api/routes/index.ts
var routes = (0, import_express3.Router)();
routes.use(user_routes_default);
routes.use(auth_routes_default);
var routes_default = routes;

// src/app/api/middlewares/error-handler.ts
var import_http_status_codes7 = require("http-status-codes");
var errorHandler = (err, req, res, next) => {
  return err ? res.status(err.statusCode).json(err.name) : res.status(import_http_status_codes7.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
};

// src/server.ts
var app = (0, import_express4.default)();
var port = process.env.PORT || 3e3;
app.get("/", (req, res) => {
  res.send(`
        <style>
            body{
                background-color: #101010;
                color: #f5f5f5;
            }
        </style>
        <h1>JWT-AUTH API</h1>
    `);
});
app.use(import_express4.default.json());
app.use(routes_default);
app.use(errorHandler);
app.listen(port, () => console.log(`\u{1F680} Server is listening on port ${port}...`));
