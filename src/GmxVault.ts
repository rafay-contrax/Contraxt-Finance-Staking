import {
    Approval as ApprovalEvent,
    Transfer as TransferEvent,
    Deposit as DepositEvent,
    Withdraw as WithdrawEvent,
    GmxVault,
  } from "../generated/Gmx/GmxVault";
  import { GmxLp } from "../generated/Gmx/GmxLp";
  import {
    Approval,
    Transfer,
    User,
    PeriodEarn,
    UserToken,
    Deposit,
    Withdraw,
  } from "../generated/schema";
  import { Address, BigInt, log } from "@graphprotocol/graph-ts";
  
  export function handleApproval(event: ApprovalEvent): void {
    let entity = new Approval(
      event.transaction.hash.concatI32(event.logIndex.toI32())
    );
    entity.owner = event.params.owner;
    entity.spender = event.params.spender;
    entity.value = event.params.value;
  
    entity.blockNumber = event.block.number;
    entity.blockTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash;
  
    entity.save();
  }
  
  export function handleTransfer(event: TransferEvent): void {
    let entity = new Transfer(
      event.transaction.hash.concatI32(event.logIndex.toI32())
    );
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
    let contract = GmxVault.bind(event.address);
    let tokenId = BigInt.fromI64(5);
    let tokenName = "Gmx";
    let platform = "Gmx";
    let vaultAddress = event.address;
    let userId = event.params._from;

    let deposit = new Deposit(
      event.transaction.hash.concatI32(event.logIndex.toI32())
    );
    let user = User.load(userId);
  
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
      userToken.userBalance = contract.balanceOf(userId);
      userToken.blockTimestamp = event.block.timestamp;
      userToken.blockNumber = event.block.number;
  
      deposit.tokenId = tokenId;
      deposit.tokenName = tokenName;
      deposit.platformName = platform;
      deposit.from = userId;
      deposit.shares = event.params._shares;
      deposit.value = event.params._value;
      deposit.userBalance = contract.balanceOf(userId);
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
    userToken.userBalance = contract.balanceOf(userId);
    userToken.blockTimestamp = event.block.timestamp;
    userToken.blockNumber = event.block.number;
  
    deposit.tokenId = tokenId;
    deposit.tokenName = tokenName;
    deposit.platformName = platform;
    deposit.from = userId;
    deposit.shares = event.params._shares;
    deposit.value = event.params._value;
    deposit.userBalance = contract.balanceOf(userId);
    deposit.blockTimestamp = event.block.timestamp;
    deposit.blockNumber = event.block.number;
  
    deposit.save();
    user.save();
    userToken.save();
  }
  
  export function handleWithdraw(event: WithdrawEvent): void {
    let zero = BigInt.fromI64(0);
    let contract = GmxVault.bind(event.address);
    let tokenId = BigInt.fromI64(5);
    let tokenName = "Gmx";
    let platform = "Gmx";
    let vaultAddress = event.address;
    let userId = event.params._from;

    let lpContract = GmxLp.bind(contract.token());
    let withdraw = new Withdraw(event.transaction.hash.concatI32(event.logIndex.toI32()));
    let user = User.load(userId);

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
      userToken.userBalance = contract.balanceOf(userId);
      userToken.blockTimestamp = event.block.timestamp;
      userToken.blockNumber = event.block.number;

      if (contract.balanceOf(userId).equals(zero)) {
        let periodEarn = new PeriodEarn(event.transaction.hash.concatI32(event.logIndex.toI32()));
        periodEarn.userId = userId;
        periodEarn.vaultAddress = vaultAddress;
        periodEarn.tokenId = tokenId;
        periodEarn.tokenName = tokenName;
        periodEarn.platformName = platform;
        periodEarn.totalDeposit = userToken.deposit;
        periodEarn.totalWithdraw = userToken.withdraw;
        periodEarn.userBalance = contract.balanceOf(userId);
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
      withdraw.userBalance = contract.balanceOf(userId);
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
    userToken.userBalance = contract.balanceOf(userId);
    userToken.blockTimestamp = event.block.timestamp;
    userToken.blockNumber = event.block.number;
  
    if (contract.balanceOf(userId).equals(zero)) {
      let periodEarn = new PeriodEarn(
        event.transaction.hash.concatI32(event.logIndex.toI32())
      );
      periodEarn.userId = userId;
      periodEarn.vaultAddress = vaultAddress;
      periodEarn.tokenId = tokenId;
      periodEarn.tokenName = tokenName;
      periodEarn.platformName = platform;
      periodEarn.totalDeposit = userToken.deposit;
      periodEarn.totalWithdraw = userToken.withdraw;
      periodEarn.userBalance = contract.balanceOf(userId);
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
    withdraw.userBalance = contract.balanceOf(userId);
    withdraw.blockTimestamp = event.block.timestamp;
    withdraw.blockNumber = event.block.number;
  
    withdraw.save();
    user.save();
    userToken.save();
  }
  