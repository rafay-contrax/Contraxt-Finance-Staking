import {
  Approval as ApprovalEvent,
  Transfer as TransferEvent,
  Deposit as DepositEvent,
  Withdraw as WithdrawEvent,
  SteerVault,
} from "../generated/Usdc_UsdceSteerVault/SteerVault";
import { Approval, Transfer, User, PeriodEarn, UserToken, Deposit, Withdraw } from "../generated/schema";
import { Address, BigInt, log } from "@graphprotocol/graph-ts";

let idArray = [36, 35, 37, 38, 39];
let tokenNameArray = ["Usdc-Usdc.e-deprecated", "Usdt-Usdc.e", "Weth-Usdc.e", "Weth-Sushi", "Usdc-Usdc.e"];
let vaultArray: Array<string> = [
  "0xe41586C416D8fAb3ee01e8a29DaD6f3a8655097d",
  "0x378eB5201c77B6886c2c6a825c53bD8E49878541",
  "0x9b77722F39cD07474f3811B9B2d1058Aea09F29E",
  "0x51A4d5bBcDEa6810Bad4E130C10EFC76C01CFe58",
  "0x76512AB6a1DEDD45B75dee47841eB9feD2411789",
];

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.owner = event.params.owner;
  entity.spender = event.params.spender;
  entity.value = event.params.value;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.value = event.params.value;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleDeposit(event: DepositEvent): void {
  let zero = BigInt.fromI64(0);
  let contract = SteerVault.bind(event.address);
  let tokenId = zero;
  let tokenName = "Unkown";
  let platform = "Steer";
  let vaultAddress = event.address;
  let userId = event.params._from;

  for (let i = 0; i < vaultArray.length; i++) {
    if (vaultAddress.equals(Address.fromHexString(vaultArray[i]))) {
      tokenId = BigInt.fromI64(idArray[i]);
      tokenName = tokenNameArray[i];
      break;
    }
  }

  let deposit = new Deposit(event.transaction.hash.concatI32(event.logIndex.toI32()));
  let user = User.load(userId);
  let userBalance = contract.balanceOf(userId);

  if (!user) {
    user = new User(userId);
    let userToken = UserToken.load(vaultAddress.concat(userId));
    if (!userToken) {
      userToken = new UserToken(vaultAddress.concat(userId));

      userToken.userId = userId;
      userToken.vaultAddress = vaultAddress;
      userToken.tokenId = tokenId;
      userToken.tokenName = tokenName;
      userToken.platformName = platform;
      userToken.deposit = zero;
      userToken.withdraw = zero;
      userToken.userBalance = zero;
      userToken.blockTimestamp = event.block.timestamp;
      userToken.blockNumber = event.block.number;
    }

    userToken.deposit = userToken.deposit.plus(event.params._value);
    userToken.userBalance = userBalance;
    userToken.blockTimestamp = event.block.timestamp;
    userToken.blockNumber = event.block.number;

    deposit.tokenId = tokenId;
    deposit.tokenName = tokenName;
    deposit.platformName = platform;
    deposit.from = userId;
    deposit.shares = event.params._shares;
    deposit.value = event.params._value;
    deposit.userBalance = userBalance;
    deposit.blockTimestamp = event.block.timestamp;
    deposit.blockNumber = event.block.number;

    deposit.save();
    user.save();
    userToken.save();
    return;
  }

  let userToken = UserToken.load(vaultAddress.concat(userId));

  if (!userToken) {
    userToken = new UserToken(vaultAddress.concat(userId));
    userToken.userId = userId;
    userToken.tokenId = tokenId;
    userToken.tokenName = tokenName;
    userToken.platformName = platform;
    userToken.vaultAddress = vaultAddress;
    userToken.deposit = zero;
    userToken.withdraw = zero;
    userToken.userBalance = zero;
    userToken.blockTimestamp = event.block.timestamp;
    userToken.blockNumber = event.block.number;
  }

  userToken.deposit = userToken.deposit.plus(event.params._value);
  userToken.userBalance = userBalance;
  userToken.blockTimestamp = event.block.timestamp;
  userToken.blockNumber = event.block.number;

  deposit.tokenId = tokenId;
  deposit.tokenName = tokenName;
  deposit.platformName = platform;
  deposit.from = userId;
  deposit.shares = event.params._shares;
  deposit.value = event.params._value;
  deposit.userBalance = userBalance;
  deposit.blockTimestamp = event.block.timestamp;
  deposit.blockNumber = event.block.number;

  deposit.save();
  user.save();
  userToken.save();
}

export function handleWithdraw(event: WithdrawEvent): void {
  let zero = BigInt.fromI64(0);
  let contract = SteerVault.bind(event.address);
  let tokenId = zero;
  let tokenName = "Unkown";
  let platform = "Steer";
  let vaultAddress = event.address;
  let userId = event.params._from;

  for (let i = 0; i < vaultArray.length; i++) {
    if (vaultAddress.equals(Address.fromHexString(vaultArray[i]))) {
      tokenId = BigInt.fromI64(idArray[i]);
      tokenName = tokenNameArray[i];
      break;
    }
  }

  let withdraw = new Withdraw(event.transaction.hash.concatI32(event.logIndex.toI32()));

  let user = User.load(userId);
  let userBalance = contract.balanceOf(userId);

  if (!user) {
    user = new User(userId);
    let userToken = UserToken.load(vaultAddress.concat(userId));
    if (!userToken) {
      userToken = new UserToken(vaultAddress.concat(userId));
      userToken.userId = userId;
      userToken.vaultAddress = vaultAddress;
      userToken.tokenId = tokenId;
      userToken.tokenName = tokenName;
      userToken.platformName = platform;
      userToken.deposit = zero;
      userToken.withdraw = zero;
      userToken.userBalance = zero;
      userToken.blockTimestamp = event.block.timestamp;
      userToken.blockNumber = event.block.number;
    }

    userToken.withdraw = userToken.withdraw.plus(event.params._value);
    userToken.userBalance = userBalance;
    userToken.blockTimestamp = event.block.timestamp;
    userToken.blockNumber = event.block.number;

    if (userBalance.equals(zero)) {
      let periodEarn = new PeriodEarn(event.transaction.hash.concatI32(event.logIndex.toI32()));
      periodEarn.userId = userId;
      periodEarn.vaultAddress = vaultAddress;
      periodEarn.tokenId = tokenId;
      periodEarn.tokenName = tokenName;
      periodEarn.platformName = platform;
      periodEarn.totalDeposit = userToken.deposit;
      periodEarn.totalWithdraw = userToken.withdraw;
      periodEarn.userBalance = userBalance;
      periodEarn.blockTimestamp = event.block.timestamp;
      periodEarn.blockNumber = event.block.number;

      userToken.deposit = zero;
      userToken.withdraw = zero;

      periodEarn.save();
    }

    withdraw.tokenId = tokenId;
    withdraw.tokenName = tokenName;
    withdraw.platformName = platform;
    withdraw.from = userId;
    withdraw.shares = event.params._shares;
    withdraw.value = event.params._value;
    withdraw.userBalance = userBalance;
    withdraw.blockTimestamp = event.block.timestamp;
    withdraw.blockNumber = event.block.number;

    withdraw.save();
    user.save();
    userToken.save();
    return;
  }

  let userToken = UserToken.load(vaultAddress.concat(userId));

  if (!userToken) {
    userToken = new UserToken(vaultAddress.concat(userId));
    userToken.userId = userId;
    userToken.tokenId = tokenId;
    userToken.tokenName = tokenName;
    userToken.platformName = platform;
    userToken.vaultAddress = vaultAddress;
    userToken.deposit = zero;
    userToken.withdraw = zero;
    userToken.userBalance = zero;
    userToken.blockTimestamp = event.block.timestamp;
    userToken.blockNumber = event.block.number;
  }

  userToken.withdraw = userToken.withdraw.plus(event.params._value);
  userToken.userBalance = userBalance;
  userToken.blockTimestamp = event.block.timestamp;
  userToken.blockNumber = event.block.number;

  if (userBalance.equals(zero)) {
    let periodEarn = new PeriodEarn(event.transaction.hash.concatI32(event.logIndex.toI32()));

    periodEarn.userId = userId;
    periodEarn.vaultAddress = vaultAddress;
    periodEarn.tokenId = tokenId;
    periodEarn.tokenName = tokenName;
    periodEarn.platformName = platform;
    periodEarn.totalWithdraw = userToken.withdraw;
    periodEarn.totalDeposit = userToken.deposit;
    periodEarn.userBalance = userBalance;
    periodEarn.blockTimestamp = event.block.timestamp;
    periodEarn.blockNumber = event.block.number;

    userToken.deposit = zero;
    userToken.withdraw = zero;

    periodEarn.save();
  }

  withdraw.tokenId = tokenId;
  withdraw.tokenName = tokenName;
  withdraw.platformName = platform;
  withdraw.from = userId;
  withdraw.shares = event.params._shares;
  withdraw.value = event.params._value;
  withdraw.userBalance = userBalance;
  withdraw.blockTimestamp = event.block.timestamp;
  withdraw.blockNumber = event.block.number;

  withdraw.save();
  user.save();
  userToken.save();
}
