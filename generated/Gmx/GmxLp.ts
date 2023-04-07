// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Approval extends ethereum.Event {
  get params(): Approval__Params {
    return new Approval__Params(this);
  }
}

export class Approval__Params {
  _event: Approval;

  constructor(event: Approval) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get spender(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Transfer extends ethereum.Event {
  get params(): Transfer__Params {
    return new Transfer__Params(this);
  }
}

export class Transfer__Params {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class GmxLp extends ethereum.SmartContract {
  static bind(address: Address): GmxLp {
    return new GmxLp("GmxLp", address);
  }

  admins(param0: Address): boolean {
    let result = super.call("admins", "admins(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBoolean();
  }

  try_admins(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("admins", "admins(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  allowance(_owner: Address, _spender: Address): BigInt {
    let result = super.call(
      "allowance",
      "allowance(address,address):(uint256)",
      [ethereum.Value.fromAddress(_owner), ethereum.Value.fromAddress(_spender)]
    );

    return result[0].toBigInt();
  }

  try_allowance(
    _owner: Address,
    _spender: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "allowance",
      "allowance(address,address):(uint256)",
      [ethereum.Value.fromAddress(_owner), ethereum.Value.fromAddress(_spender)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  allowances(param0: Address, param1: Address): BigInt {
    let result = super.call(
      "allowances",
      "allowances(address,address):(uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );

    return result[0].toBigInt();
  }

  try_allowances(
    param0: Address,
    param1: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "allowances",
      "allowances(address,address):(uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  approve(_spender: Address, _amount: BigInt): boolean {
    let result = super.call("approve", "approve(address,uint256):(bool)", [
      ethereum.Value.fromAddress(_spender),
      ethereum.Value.fromUnsignedBigInt(_amount)
    ]);

    return result[0].toBoolean();
  }

  try_approve(
    _spender: Address,
    _amount: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall("approve", "approve(address,uint256):(bool)", [
      ethereum.Value.fromAddress(_spender),
      ethereum.Value.fromUnsignedBigInt(_amount)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  balanceOf(_account: Address): BigInt {
    let result = super.call("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(_account)
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(_account: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(_account)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  balances(param0: Address): BigInt {
    let result = super.call("balances", "balances(address):(uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBigInt();
  }

  try_balances(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balances", "balances(address):(uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  decimals(): i32 {
    let result = super.call("decimals", "decimals():(uint8)", []);

    return result[0].toI32();
  }

  try_decimals(): ethereum.CallResult<i32> {
    let result = super.tryCall("decimals", "decimals():(uint8)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  gov(): Address {
    let result = super.call("gov", "gov():(address)", []);

    return result[0].toAddress();
  }

  try_gov(): ethereum.CallResult<Address> {
    let result = super.tryCall("gov", "gov():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  id(): string {
    let result = super.call("id", "id():(string)", []);

    return result[0].toString();
  }

  try_id(): ethereum.CallResult<string> {
    let result = super.tryCall("id", "id():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  inPrivateTransferMode(): boolean {
    let result = super.call(
      "inPrivateTransferMode",
      "inPrivateTransferMode():(bool)",
      []
    );

    return result[0].toBoolean();
  }

  try_inPrivateTransferMode(): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "inPrivateTransferMode",
      "inPrivateTransferMode():(bool)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isHandler(param0: Address): boolean {
    let result = super.call("isHandler", "isHandler(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBoolean();
  }

  try_isHandler(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("isHandler", "isHandler(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isMinter(param0: Address): boolean {
    let result = super.call("isMinter", "isMinter(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBoolean();
  }

  try_isMinter(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("isMinter", "isMinter(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  nonStakingAccounts(param0: Address): boolean {
    let result = super.call(
      "nonStakingAccounts",
      "nonStakingAccounts(address):(bool)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBoolean();
  }

  try_nonStakingAccounts(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "nonStakingAccounts",
      "nonStakingAccounts(address):(bool)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  nonStakingSupply(): BigInt {
    let result = super.call(
      "nonStakingSupply",
      "nonStakingSupply():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_nonStakingSupply(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "nonStakingSupply",
      "nonStakingSupply():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  stakedBalance(_account: Address): BigInt {
    let result = super.call(
      "stakedBalance",
      "stakedBalance(address):(uint256)",
      [ethereum.Value.fromAddress(_account)]
    );

    return result[0].toBigInt();
  }

  try_stakedBalance(_account: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "stakedBalance",
      "stakedBalance(address):(uint256)",
      [ethereum.Value.fromAddress(_account)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  totalStaked(): BigInt {
    let result = super.call("totalStaked", "totalStaked():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalStaked(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("totalStaked", "totalStaked():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  totalSupply(): BigInt {
    let result = super.call("totalSupply", "totalSupply():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalSupply(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("totalSupply", "totalSupply():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  transfer(_recipient: Address, _amount: BigInt): boolean {
    let result = super.call("transfer", "transfer(address,uint256):(bool)", [
      ethereum.Value.fromAddress(_recipient),
      ethereum.Value.fromUnsignedBigInt(_amount)
    ]);

    return result[0].toBoolean();
  }

  try_transfer(
    _recipient: Address,
    _amount: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall("transfer", "transfer(address,uint256):(bool)", [
      ethereum.Value.fromAddress(_recipient),
      ethereum.Value.fromUnsignedBigInt(_amount)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  transferFrom(
    _sender: Address,
    _recipient: Address,
    _amount: BigInt
  ): boolean {
    let result = super.call(
      "transferFrom",
      "transferFrom(address,address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(_sender),
        ethereum.Value.fromAddress(_recipient),
        ethereum.Value.fromUnsignedBigInt(_amount)
      ]
    );

    return result[0].toBoolean();
  }

  try_transferFrom(
    _sender: Address,
    _recipient: Address,
    _amount: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "transferFrom",
      "transferFrom(address,address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(_sender),
        ethereum.Value.fromAddress(_recipient),
        ethereum.Value.fromUnsignedBigInt(_amount)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  yieldTrackers(param0: BigInt): Address {
    let result = super.call(
      "yieldTrackers",
      "yieldTrackers(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return result[0].toAddress();
  }

  try_yieldTrackers(param0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "yieldTrackers",
      "yieldTrackers(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AddAdminCall extends ethereum.Call {
  get inputs(): AddAdminCall__Inputs {
    return new AddAdminCall__Inputs(this);
  }

  get outputs(): AddAdminCall__Outputs {
    return new AddAdminCall__Outputs(this);
  }
}

export class AddAdminCall__Inputs {
  _call: AddAdminCall;

  constructor(call: AddAdminCall) {
    this._call = call;
  }

  get _account(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class AddAdminCall__Outputs {
  _call: AddAdminCall;

  constructor(call: AddAdminCall) {
    this._call = call;
  }
}

export class AddNonStakingAccountCall extends ethereum.Call {
  get inputs(): AddNonStakingAccountCall__Inputs {
    return new AddNonStakingAccountCall__Inputs(this);
  }

  get outputs(): AddNonStakingAccountCall__Outputs {
    return new AddNonStakingAccountCall__Outputs(this);
  }
}

export class AddNonStakingAccountCall__Inputs {
  _call: AddNonStakingAccountCall;

  constructor(call: AddNonStakingAccountCall) {
    this._call = call;
  }

  get _account(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class AddNonStakingAccountCall__Outputs {
  _call: AddNonStakingAccountCall;

  constructor(call: AddNonStakingAccountCall) {
    this._call = call;
  }
}

export class ApproveCall extends ethereum.Call {
  get inputs(): ApproveCall__Inputs {
    return new ApproveCall__Inputs(this);
  }

  get outputs(): ApproveCall__Outputs {
    return new ApproveCall__Outputs(this);
  }
}

export class ApproveCall__Inputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get _spender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ApproveCall__Outputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class BurnCall extends ethereum.Call {
  get inputs(): BurnCall__Inputs {
    return new BurnCall__Inputs(this);
  }

  get outputs(): BurnCall__Outputs {
    return new BurnCall__Outputs(this);
  }
}

export class BurnCall__Inputs {
  _call: BurnCall;

  constructor(call: BurnCall) {
    this._call = call;
  }

  get _account(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class BurnCall__Outputs {
  _call: BurnCall;

  constructor(call: BurnCall) {
    this._call = call;
  }
}

export class ClaimCall extends ethereum.Call {
  get inputs(): ClaimCall__Inputs {
    return new ClaimCall__Inputs(this);
  }

  get outputs(): ClaimCall__Outputs {
    return new ClaimCall__Outputs(this);
  }
}

export class ClaimCall__Inputs {
  _call: ClaimCall;

  constructor(call: ClaimCall) {
    this._call = call;
  }

  get _receiver(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ClaimCall__Outputs {
  _call: ClaimCall;

  constructor(call: ClaimCall) {
    this._call = call;
  }
}

export class MintCall extends ethereum.Call {
  get inputs(): MintCall__Inputs {
    return new MintCall__Inputs(this);
  }

  get outputs(): MintCall__Outputs {
    return new MintCall__Outputs(this);
  }
}

export class MintCall__Inputs {
  _call: MintCall;

  constructor(call: MintCall) {
    this._call = call;
  }

  get _account(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class MintCall__Outputs {
  _call: MintCall;

  constructor(call: MintCall) {
    this._call = call;
  }
}

export class RecoverClaimCall extends ethereum.Call {
  get inputs(): RecoverClaimCall__Inputs {
    return new RecoverClaimCall__Inputs(this);
  }

  get outputs(): RecoverClaimCall__Outputs {
    return new RecoverClaimCall__Outputs(this);
  }
}

export class RecoverClaimCall__Inputs {
  _call: RecoverClaimCall;

  constructor(call: RecoverClaimCall) {
    this._call = call;
  }

  get _account(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _receiver(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class RecoverClaimCall__Outputs {
  _call: RecoverClaimCall;

  constructor(call: RecoverClaimCall) {
    this._call = call;
  }
}

export class RemoveAdminCall extends ethereum.Call {
  get inputs(): RemoveAdminCall__Inputs {
    return new RemoveAdminCall__Inputs(this);
  }

  get outputs(): RemoveAdminCall__Outputs {
    return new RemoveAdminCall__Outputs(this);
  }
}

export class RemoveAdminCall__Inputs {
  _call: RemoveAdminCall;

  constructor(call: RemoveAdminCall) {
    this._call = call;
  }

  get _account(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class RemoveAdminCall__Outputs {
  _call: RemoveAdminCall;

  constructor(call: RemoveAdminCall) {
    this._call = call;
  }
}

export class RemoveNonStakingAccountCall extends ethereum.Call {
  get inputs(): RemoveNonStakingAccountCall__Inputs {
    return new RemoveNonStakingAccountCall__Inputs(this);
  }

  get outputs(): RemoveNonStakingAccountCall__Outputs {
    return new RemoveNonStakingAccountCall__Outputs(this);
  }
}

export class RemoveNonStakingAccountCall__Inputs {
  _call: RemoveNonStakingAccountCall;

  constructor(call: RemoveNonStakingAccountCall) {
    this._call = call;
  }

  get _account(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class RemoveNonStakingAccountCall__Outputs {
  _call: RemoveNonStakingAccountCall;

  constructor(call: RemoveNonStakingAccountCall) {
    this._call = call;
  }
}

export class SetGovCall extends ethereum.Call {
  get inputs(): SetGovCall__Inputs {
    return new SetGovCall__Inputs(this);
  }

  get outputs(): SetGovCall__Outputs {
    return new SetGovCall__Outputs(this);
  }
}

export class SetGovCall__Inputs {
  _call: SetGovCall;

  constructor(call: SetGovCall) {
    this._call = call;
  }

  get _gov(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetGovCall__Outputs {
  _call: SetGovCall;

  constructor(call: SetGovCall) {
    this._call = call;
  }
}

export class SetHandlerCall extends ethereum.Call {
  get inputs(): SetHandlerCall__Inputs {
    return new SetHandlerCall__Inputs(this);
  }

  get outputs(): SetHandlerCall__Outputs {
    return new SetHandlerCall__Outputs(this);
  }
}

export class SetHandlerCall__Inputs {
  _call: SetHandlerCall;

  constructor(call: SetHandlerCall) {
    this._call = call;
  }

  get _handler(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _isActive(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class SetHandlerCall__Outputs {
  _call: SetHandlerCall;

  constructor(call: SetHandlerCall) {
    this._call = call;
  }
}

export class SetInPrivateTransferModeCall extends ethereum.Call {
  get inputs(): SetInPrivateTransferModeCall__Inputs {
    return new SetInPrivateTransferModeCall__Inputs(this);
  }

  get outputs(): SetInPrivateTransferModeCall__Outputs {
    return new SetInPrivateTransferModeCall__Outputs(this);
  }
}

export class SetInPrivateTransferModeCall__Inputs {
  _call: SetInPrivateTransferModeCall;

  constructor(call: SetInPrivateTransferModeCall) {
    this._call = call;
  }

  get _inPrivateTransferMode(): boolean {
    return this._call.inputValues[0].value.toBoolean();
  }
}

export class SetInPrivateTransferModeCall__Outputs {
  _call: SetInPrivateTransferModeCall;

  constructor(call: SetInPrivateTransferModeCall) {
    this._call = call;
  }
}

export class SetInfoCall extends ethereum.Call {
  get inputs(): SetInfoCall__Inputs {
    return new SetInfoCall__Inputs(this);
  }

  get outputs(): SetInfoCall__Outputs {
    return new SetInfoCall__Outputs(this);
  }
}

export class SetInfoCall__Inputs {
  _call: SetInfoCall;

  constructor(call: SetInfoCall) {
    this._call = call;
  }

  get _name(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _symbol(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class SetInfoCall__Outputs {
  _call: SetInfoCall;

  constructor(call: SetInfoCall) {
    this._call = call;
  }
}

export class SetMinterCall extends ethereum.Call {
  get inputs(): SetMinterCall__Inputs {
    return new SetMinterCall__Inputs(this);
  }

  get outputs(): SetMinterCall__Outputs {
    return new SetMinterCall__Outputs(this);
  }
}

export class SetMinterCall__Inputs {
  _call: SetMinterCall;

  constructor(call: SetMinterCall) {
    this._call = call;
  }

  get _minter(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _isActive(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class SetMinterCall__Outputs {
  _call: SetMinterCall;

  constructor(call: SetMinterCall) {
    this._call = call;
  }
}

export class SetYieldTrackersCall extends ethereum.Call {
  get inputs(): SetYieldTrackersCall__Inputs {
    return new SetYieldTrackersCall__Inputs(this);
  }

  get outputs(): SetYieldTrackersCall__Outputs {
    return new SetYieldTrackersCall__Outputs(this);
  }
}

export class SetYieldTrackersCall__Inputs {
  _call: SetYieldTrackersCall;

  constructor(call: SetYieldTrackersCall) {
    this._call = call;
  }

  get _yieldTrackers(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }
}

export class SetYieldTrackersCall__Outputs {
  _call: SetYieldTrackersCall;

  constructor(call: SetYieldTrackersCall) {
    this._call = call;
  }
}

export class TransferCall extends ethereum.Call {
  get inputs(): TransferCall__Inputs {
    return new TransferCall__Inputs(this);
  }

  get outputs(): TransferCall__Outputs {
    return new TransferCall__Outputs(this);
  }
}

export class TransferCall__Inputs {
  _call: TransferCall;

  constructor(call: TransferCall) {
    this._call = call;
  }

  get _recipient(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class TransferCall__Outputs {
  _call: TransferCall;

  constructor(call: TransferCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class TransferFromCall extends ethereum.Call {
  get inputs(): TransferFromCall__Inputs {
    return new TransferFromCall__Inputs(this);
  }

  get outputs(): TransferFromCall__Outputs {
    return new TransferFromCall__Outputs(this);
  }
}

export class TransferFromCall__Inputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get _sender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _recipient(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferFromCall__Outputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class WithdrawTokenCall extends ethereum.Call {
  get inputs(): WithdrawTokenCall__Inputs {
    return new WithdrawTokenCall__Inputs(this);
  }

  get outputs(): WithdrawTokenCall__Outputs {
    return new WithdrawTokenCall__Outputs(this);
  }
}

export class WithdrawTokenCall__Inputs {
  _call: WithdrawTokenCall;

  constructor(call: WithdrawTokenCall) {
    this._call = call;
  }

  get _token(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _account(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class WithdrawTokenCall__Outputs {
  _call: WithdrawTokenCall;

  constructor(call: WithdrawTokenCall) {
    this._call = call;
  }
}
