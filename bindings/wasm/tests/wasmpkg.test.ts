import { expect, it } from "vitest";
import { XmtpApi } from "..";

it("can instantiate", async () => {
  const a = await XmtpApi.initialize();
  expect(a).toBeDefined();

  // Make sure we can call it again
  const b = await XmtpApi.initialize();
  expect(b).toBeDefined();
});

it("can set private_key_bundle", async () => {
  const a = await XmtpApi.initialize();
  // Base64 decode the private key bundle
  const bundle = Buffer.from("EpYDCsgBCMDw7ZjWtOygFxIiCiAvph+Hg/Gk9G1g2EoW1ZDlWVH1nCkn6uRL7GBG3iNophqXAQpPCMDw7ZjWtOygFxpDCkEEeH4w/gK5HMaKu51aec/jiosmqDduIaEA67V7Lbox1cPhz9SIEi6sY/6jVQQXeIjKxzsZSVrM0LXCXjc0VkRmxhJEEkIKQNSujk9ApV5gIKltm0CFhLLuN3Xt2fjkKZBoUH/mswjTaUMTc3qZZzde3ZKMfkNVZYqns4Sn0sgopXzpjQGgjyUSyAEIwPXBtNa07KAXEiIKIOekWIyRJCelxqX+mR8i76KuDO2QV3e42nv8CxJQL0DXGpcBCk8IwPXBtNa07KAXGkMKQQTIePKpkAHxREbLbXfn6XCOwx9YqQWmqLuTHAnqRNj1q5xDLpbgkiyAORFZmVOK8iVq3dT/PWm6WMasPrqdzD7iEkQKQgpAqIj/yKx2wn8VjeWV6wm/neNDEQ6282p3CeJsPDKS56B11Nqc5Y5vUPKcrC1nB2dqBkwvop0fU49Yx4k0CB2evQ==", "base64");

  const res = await a.setPrivateKeyBundle(bundle);
  expect(res).toBe(true);
});

it("can set private_key_bundle and decode invites", async () => {
  const privateBundle = Buffer.from("EpYDCsgBCICHs+6ZvJKjFxIiCiCNtoFf4wgcj3UH5Nhy6vHD94+HbVWUAdYlQ9IYGMv5tBqXAQpPCICHs+6ZvJKjFxpDCkEEYYEjMNUf/Eu1hJH8aZJ8bJrfVitQLGCq0P2QFcEsetPpIHHvB7vqZEctGvq13pbQbkx+LTuKUMwT+cYR6OVBQBJEEkIKQPbipTP3/U4jWwRLI8SbrDJMttTFe+2p55buL9+IUOkCM/IYaB2teaprjWXHhs3dNEkOiI1c5dLeGNrAFBfgYHMSyAEIwIfKiZq8kqMXEiIKIAOcJgVnEPy1OPad9KytYnvN+X67I33mqVKlHMqU9qsZGpcBCk8IwIfKiZq8kqMXGkMKQQTU6+Vdl4ZzsJrhRQvz2Nl7+e8CNdMY04OnC1u5JYZ6ECN+Kez0pJwc2YhypqFisyWuq6s5+FhIa83A6RAtI264EkQKQgpAHH18U/ykyjLFg5T59c35tt/TLZ5lnHwWJGDLaRZAlR81UVfW634+SvEijLbS0IWJ5ZZblwbvMarvfjm0G2i0aw==", "base64");
  const invite = Buffer.from("CtgGCvgECrQCCpcBCk8IgIez7pm8kqMXGkMKQQRhgSMw1R/8S7WEkfxpknxsmt9WK1AsYKrQ/ZAVwSx60+kgce8Hu+pkRy0a+rXeltBuTH4tO4pQzBP5xhHo5UFAEkQSQgpA9uKlM/f9TiNbBEsjxJusMky21MV77annlu4v34hQ6QIz8hhoHa15qmuNZceGzd00SQ6IjVzl0t4Y2sAUF+BgcxKXAQpPCMCHyomavJKjFxpDCkEE1OvlXZeGc7Ca4UUL89jZe/nvAjXTGNODpwtbuSWGehAjfins9KScHNmIcqahYrMlrqurOfhYSGvNwOkQLSNuuBJECkIKQBx9fFP8pMoyxYOU+fXN+bbf0y2eZZx8FiRgy2kWQJUfNVFX1ut+PkrxIoy20tCFieWWW5cG7zGq7345tBtotGsStAIKlwEKTwiA/+ajmrySoxcaQwpBBEzal8mv0MYw04DqoFJK8RRJmrKDXPRmPN50RFOiF1gIW1M1i26WqT+n1Te2nU5hve7c7RQ2/2aPSuMsbWeeK1MSRBJCCkDWVrt1G16A83mNhT1y1gXDLX9HVwk5Rqab/I0VjS0cr2gUqX2l3O0HXirWyFlCqua4HfPDlpB4WY4ANDTxgajAEpcBCk8IwKW5tZq8kqMXGkMKQQRX0e1CP6Jc5kbjtXF1oxgbFciNSt002UlP4ZS6vDmkCYvQyclEtY3TQcrBXSNNK2JbDwu30+1z+h6DqasrMJc6EkQKQgpAw2rkuwL7e0s3XrrtY6+YhEMmh2nijAMFQKXPFa8edKE1LfMqp0IAGhYXBiGlV7A7yPZDXLLasf11Uy4ww2WiyxiAqva1mrySoxcS2gEK1wEKIPl1rD6K3Oj8Ps+zIzfp+n2/hUKqE/ORkHOsZ8kJpIFtEgwb7/dw52hTPD37IsYapAGAJTWRotzIHUtMu1bLd7izktJOh3cJ+ZXODtho02lsNp6DuwNIoEXesdoFRtVZCYqvaiOwnctX+nnPsSfemDmQ1mJ/o4sZyvFAF25ufSBaBqRJeyQjUBbfyuJSWYoDiqAAAMzsWPzrPeVJZFXrcOdDSTA11b+MevlfzcFjitqv/0J2j+pcQo4RFOgtpFK9cUkbcIB2xjRBRXOUQL89BuyMQmb+gg==", "base64");
  let expected_key_material_b64 = "pCZEyn0gkwTrNDOlewVGTHYuqXdWzv9s+WKUWCtdFCk=";

  const a = await XmtpApi.initialize();
  const bundleRes = a.setPrivateKeyBundle(privateBundle);
  expect(bundleRes).toBe(true);

  const inviteRes = a.saveInvitation(invite);
  expect(inviteRes).toBe(true);
});