import {
  Approval as ApprovalEvent,
  Transfer as TransferEvent,
  Deposit as DepositEvent,
  Withdraw as WithdrawEvent,
  ClipperVault,
} from "../generated/ClipperVault/ClipperVault";
import { Approval, Transfer, User, PeriodEarn, UserToken, Deposit, Withdraw } from "../generated/schema";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import { extractSmartAccountAddress } from "./common";

let idArray = [40];
let tokenNameArray = ["Clipper"];
let vaultArray: Array<string> = ["0xa752C41Ca7De8B6852D9f6e17E224D166dCC456b"];

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
  let contract = ClipperVault.bind(event.address);
  let tokenId = zero;
  let tokenName = "Clipper";
  let platform = "Clipper";
  let vaultAddress = event.address;
  let userId = extractSmartAccountAddress(event);

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
  let contract = ClipperVault.bind(event.address);
  let tokenId = zero;
  let tokenName = "Clipper";
  let platform = "Clipper";
  let vaultAddress = event.address;
  let userId = extractSmartAccountAddress(event);

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
