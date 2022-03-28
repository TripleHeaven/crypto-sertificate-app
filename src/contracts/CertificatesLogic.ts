import BN from 'bn.js';
import BigNumber from 'bignumber.js';
import {
  PromiEvent,
  TransactionReceipt,
  EventResponse,
  EventData,
  Web3ContractContext,
} from 'ethereum-abi-types-generator';

export interface CallOptions {
  from?: string;
  gasPrice?: string;
  gas?: number;
}

export interface SendOptions {
  from: string;
  value?: number | string | BN | BigNumber;
  gasPrice?: string;
  gas?: number;
}

export interface EstimateGasOptions {
  from?: string;
  value?: number | string | BN | BigNumber;
  gas?: number;
}

export interface MethodPayableReturnContext {
  send(options: SendOptions): PromiEvent<TransactionReceipt>;
  send(
    options: SendOptions,
    callback: (error: Error, result: any) => void
  ): PromiEvent<TransactionReceipt>;
  estimateGas(options: EstimateGasOptions): Promise<number>;
  estimateGas(
    options: EstimateGasOptions,
    callback: (error: Error, result: any) => void
  ): Promise<number>;
  encodeABI(): string;
}

export interface MethodConstantReturnContext<TCallReturn> {
  call(): Promise<TCallReturn>;
  call(options: CallOptions): Promise<TCallReturn>;
  call(
    options: CallOptions,
    callback: (error: Error, result: TCallReturn) => void
  ): Promise<TCallReturn>;
  encodeABI(): string;
}

export interface MethodReturnContext extends MethodPayableReturnContext {}

export type ContractContext = Web3ContractContext<
  CertificatesLogic,
  CertificatesLogicMethodNames,
  CertificatesLogicEventsContext,
  CertificatesLogicEvents
>;
export type CertificatesLogicEvents = 'OwnershipTransferred';
export interface CertificatesLogicEventsContext {
  OwnershipTransferred(
    parameters: {
      filter?: {
        previousOwner?: string | string[];
        newOwner?: string | string[];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
}
export type CertificatesLogicMethodNames =
  | 'new'
  | 'addDescription'
  | 'addLearner'
  | 'certificatesId'
  | 'courses'
  | 'coursesList'
  | 'createCertificate'
  | 'createCourse'
  | 'getCertificateInfo'
  | 'isOnCourse'
  | 'learners'
  | 'learnersList'
  | 'name'
  | 'owner'
  | 'removeLearner'
  | 'renounceOwnership'
  | 'symbol'
  | 'transferOwnership'
  | 'viewCertificateId'
  | 'viewCertificateURI'
  | 'viewCourses'
  | 'viewLearners';
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface CertificatedescriptionResponse {
  beginningDate: string;
  receivingDate: string;
  score: string;
  info: string;
}
export interface CertificatesLogic {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param _name Type: string, Indexed: false
   * @param _symbol Type: string, Indexed: false
   * @param _nftAddr Type: address, Indexed: false
   */
  'new'(_name: string, _symbol: string, _nftAddr: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _account Type: address, Indexed: false
   * @param _courseName Type: string, Indexed: false
   * @param _beginningDate Type: string, Indexed: false
   * @param _receivingDate Type: string, Indexed: false
   * @param _score Type: string, Indexed: false
   * @param _info Type: string, Indexed: false
   */
  addDescription(
    _account: string,
    _courseName: string,
    _beginningDate: string,
    _receivingDate: string,
    _score: string,
    _info: string
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _account Type: address, Indexed: false
   * @param _courseName Type: string, Indexed: false
   */
  addLearner(_account: string, _courseName: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: string, Indexed: false
   */
  certificatesId(
    parameter0: string,
    parameter1: string
  ): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: string, Indexed: false
   */
  courses(parameter0: string): MethodConstantReturnContext<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  coursesList(parameter0: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _account Type: address, Indexed: false
   * @param _courseName Type: string, Indexed: false
   * @param _tokenURI Type: string, Indexed: false
   */
  createCertificate(
    _account: string,
    _courseName: string,
    _tokenURI: string
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _courseName Type: string, Indexed: false
   */
  createCourse(_courseName: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _account Type: address, Indexed: false
   * @param _courseName Type: string, Indexed: false
   */
  getCertificateInfo(
    _account: string,
    _courseName: string
  ): MethodConstantReturnContext<CertificatedescriptionResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _account Type: address, Indexed: false
   * @param _courseName Type: string, Indexed: false
   */
  isOnCourse(
    _account: string,
    _courseName: string
  ): MethodConstantReturnContext<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: string, Indexed: false
   */
  learners(
    parameter0: string,
    parameter1: string
  ): MethodConstantReturnContext<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: string, Indexed: false
   * @param parameter1 Type: uint256, Indexed: false
   */
  learnersList(
    parameter0: string,
    parameter1: string
  ): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  name(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  owner(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _account Type: address, Indexed: false
   * @param _courseName Type: string, Indexed: false
   */
  removeLearner(_account: string, _courseName: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  renounceOwnership(): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  symbol(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newOwner Type: address, Indexed: false
   */
  transferOwnership(newOwner: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _account Type: address, Indexed: false
   * @param _courseName Type: string, Indexed: false
   */
  viewCertificateId(
    _account: string,
    _courseName: string
  ): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _account Type: address, Indexed: false
   * @param _courseName Type: string, Indexed: false
   */
  viewCertificateURI(
    _account: string,
    _courseName: string
  ): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  viewCourses(): MethodConstantReturnContext<string[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _courseName Type: string, Indexed: false
   */
  viewLearners(_courseName: string): MethodConstantReturnContext<string[]>;
}
