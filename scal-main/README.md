# SCAL : The Automated Smart Contract Auditing Framework

SCAL is a framework used for analysing smart contracts for threats and
vulnerabilities through automation. It integrates several smart contract auditing libraries
and packages to promote a streamlined and easy-to-use platform developed for Frontal Labs.

## Current Auditing Tools
- Slither
- Mythril
- Manticore
- Oyente
- Solhint
- Conkas
- Osiris
- Securify
- HoneyBadger
- Maian

## System Requirements

- Linux OS/Cloud Development Environment
- [Docker](https://docs.docker.com/install)
- [Python3](https://www.python.org)

## Installation
Once all the system requirements are met, you can proceed to installing the framework
1. Clone the repo (Currently a private repo
```
git clone https://github.com/Imam-Abubakar/scal.git
```
2. Install the dependencies:
```
pip3 install -r dependencies.txt
```

## Usage
Scal currently works as a CLI(Command-line Interface) Framework, with the following commands available for use. There are other commands as well but are being utilized by the framework automatically.
```bash
scal.py [-h, --help]
              --list tools                  # list all the auditing tools available
              --list contracts              # list all the smart contract vulnerabilities available
              --contract VULNERABILITY      # the name of the vulnerability you want to analyze
              --file FILES                  # the location of the folder or the smart contract to analyze
              --tool TOOLS                  # the list of tools to use for the analysis
              --info TOOL                   # show information about the tool being used
              --bounce                      # neglect contracts that has already being analyzed
              --operations OPERATION        # the number of parallel operations to run during the analysis
```

__EXAMPLE 1:__

To analyze all contracts for `reentrancy` vulnerabilities, stored in the `reentrancy` folder with a specific tool, use the command below:

```bash
python3 scal.py --tool slither --contract reentrancy
```

__EXAMPLE 2:__

To analyze a specific file/folder,you can use the option `--file` to direct to the

```bash
python3 scal.py --tool osiris --file contracts/reentrancy/simple_dao.sol
```

All analysis results is placed in the directory `results`. 

NOTE:

- To use all the tools to test a single smart contract, simply use `--tool all`

- To use parallel processing(still under testing), simply add `--operations [Number of threads]` to your syntax, the number of threads is at a default of 1 but can be changed to between 1 and 16.

# Versions
SCAL is a collection of two frameworks, with similar working processes. The first of which is this repo, which contains several auditing tools that can detect vulnerabilities in a solidity smart contract. The other which is named "SCAL(ByteCode)" which contains several auditing tools that can detect vulnerabilities in a bytecode(of a compiled solidity smart contract).

You can check out SCAL(ByteCode) here.

# Detection Process

SCAL as an entire framework, with different tools running on it has various level of vulnerability detection. With regards to the current state of the tool, the following vulnerabilities can be detected.(nut to be confused with the vulnerabilities listed in `contracts` folder).

- TOD(Front-running)
- Random Number
- Timestamp Dependence
- Unpredictable State
- Denial of Service
- Reentrancy
- Unchecked call
- Tx.origin
- Unchecked call(With low-level calls like call() delegatecall() and send())
- Self destruct
- Unchecked math
- Depreciations
amongst others.
