#!/bin/bash
outputDirectory=$(dirname $0)/output

mkdir $outputDirectory

node Analyzers/JavaScript/getOrCreateItemsInDirectory --directory=. --ignoreDirectoryNames=Coverage --ignoreDirectoryNames=testcases --ignoreDirectoryNames=node_modules --ignoreDirectoryNames=Output | 
node Processors/setTypeOfRootItems --type=file |
node Processors/removeIdentifierSuffix --suffix=/index |
node Processors/orderItemsBy/identifier |
node Processors/groupItemsByIdentifierSeparator --identifierSeparator=/ |
node Processors/orderItemsBy/indexOf/type --typesInOrder= --typesInOrder=parameter --typesInOrder=variable --typesInOrder=file |
node Processors/orderItemsBy/indexOf/identifierSuffix --identifierSuffixesInOrder=/test |
node Processors/unstackIndependent |
node Processors/stackRootItems --levels=harness --levels=Analyzers/JavaScript,Processors,Renderer --levels=callWhenProcessEntryPoint,dependencyAndStructure,Harnesses,Tests > $outputDirectory/.yaml

cat $outputDirectory/.yaml | node Renderer/getSvgForYaml > $outputDirectory/.svg