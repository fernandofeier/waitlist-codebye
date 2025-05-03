{ pkgs ? import <nixpkgs> {} }:

with pkgs;

buildEnv {
  name = "nixpacks-env";
  paths = [
    nodejs_20
    nodePackages.npm
  ];
}
