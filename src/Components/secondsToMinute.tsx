import React from 'react'

//função que transforma segundos em minutos
export default function secondsToMinute(seconds: number): string {
  const zeroEsquerda = (n: number) => Math.floor(n).toString().padStart(2, '0')
  const min = zeroEsquerda((seconds / 60) % 60);
  const seg = zeroEsquerda((seconds % 60) % 60);
  return `${min}:${seg}`
}
