---
id: 'secure-file'
name: 'Secure file'
scores:
  accessibility: 83
  bestPractices: 100
  SEO: 92
  performance:
    mobile:
      score: 73
      fcp: 2.5
      si: 2.5
      lgp: 2.5
      tti: 4.1
      tbt: 800
      cls: 0.002
    desktop:
      score: 99
      fcp: 0.7
      si: 1.0
      lgp: 0.7
      tti: 0.8
      tbt: 20
      cls: 0.03
images:
  banner:
    aspectRatio: '2420/2160'
    url: '/assets/highlighted/sf-banner.png'
  icon: '/assets/highlighted/sf-icon.png'
  ratios:
    mobile: '1284/2778'
    desktop: '1920/1080'
  mobile:
    - '/assets/highlighted/sf-m-0.png'
    - '/assets/highlighted/sf-m-1.png'
  desktop:
    - '/assets/highlighted/sf-d-0.png'
    - '/assets/highlighted/sf-d-1.png'
website: 'https://secure-file.amir4rab.com/'
github: 'https://github.com/amir4rab/secure-file'
license: 'GPL-v3'
mainTechnologies:
  - next
  - react
  - framer
  - docker
  - nginx
  - electron
  - pwa
shortInfo: 'An experimental website to take WebCrypto API and IndexDB API to their limits!'
background:
  muted: 'linear-gradient(66.59deg, #16B4B410 0%, rgba(22, 180, 180, 0) 100%), linear-gradient(113.97deg, #1C7ED610 0%, rgba(28, 126, 214, 0) 100.83%)'
  colorful: 'linear-gradient(66.59deg, rgba(250, 255, 0, 0.75) 0%, rgba(250, 255, 0, 0) 100%), linear-gradient(113.41deg, rgba(112, 0, 255, 0.75) 0%, rgba(112, 0, 255, 0) 100%), linear-gradient(293.41deg, rgba(0, 255, 194, 0.75) 0%, rgba(112, 0, 255, 0) 100%, rgba(0, 255, 194, 0) 100%), linear-gradient(246.59deg, rgba(0, 117, 255, 0.75) 0%, rgba(112, 0, 255, 0) 100%), #FFFFFF'
---

## Experiment to its max extend

Secure-file is a web application in which we use browsers' api's to their max extent. Main used apis are as the following: [WebCrypto Api](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API), which help us with encryption, decryption, crypto key creation and everything related to crypto, [IndexDB Api](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API), a fully capable database built inside modern browsers is also used to store encrypted data inside browsers storage.

## Here is a short list of the secure file features:

- Encryption of data and storing it inside browser storage.
- Decryption of stored data in order to display it or export it.
- On-fly Encryption and decryption of data, without storing encrypted/decrypted data inside browsers own storage.
- Allowing file transfers over peer to peer [webRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API) connection. ( this feature needs a hosted server of, one of my other applications)

## More info

feel free to check projects [github page](https://github.com/amir4rab/secure-file) to learn more about it
