import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:math';
import 'dart:typed_data';
import 'package:flutter/foundation.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:web3dart/web3dart.dart';

import 'package:xmtp_bindings_flutter/xmtp_bindings_flutter.dart';

void main() {
  var dbDir;
  setUpAll(() async {
    dbDir = Directory.systemTemp.createTempSync();
    return libxmtpInit();
  });
  tearDownAll(() {
    libxmtpDispose();
    dbDir.deleteSync(recursive: true);
  });
  test(
    'creating a client with consistent installations',
    () async {
      var wallet = EthPrivateKey.createRandom(Random.secure());
      var dbPath = "${dbDir.path}/${wallet.address.hex}.db";
      var encryptionKey =
          U8Array32(Uint8List.fromList(List.generate(32, (index) => index)));
      var walletSign = (text) async => wallet.signPersonalMessageToUint8List(
          Uint8List.fromList(utf8.encode(text)));
      var host = "http://localhost:5556";

      // When we create a client...
      var createdA = await createClient(
        host: host,
        isSecure: false,
        dbPath: dbPath,
        encryptionKey: encryptionKey,
        accountAddress: wallet.address.hex,
      );
      // ... it should require a signature...
      var clientA = switch (createdA) {
        CreatedClient_Ready() => throw StateError("Should require a signature"),
        CreatedClient_RequiresSignature(field0: var req) =>
          await req.sign(signature: await walletSign(req.textToSign)),
      };

      // ... which should produce a valid installation key.
      var installA = await clientA.installationPublicKey();
      expect(installA, isNotNull);

      // And when we recreate the same client...
      var createdB = await createClient(
        host: host,
        isSecure: false,
        dbPath: dbPath,
        encryptionKey: encryptionKey,
        accountAddress: wallet.address.hex,
      );
      // ... it should be ready without any signature required...
      var clientB = switch (createdB) {
        CreatedClient_Ready(field0: var client) => client,
        CreatedClient_RequiresSignature() =>
          throw StateError("Should not require signature"),
      };
      // ... and it should have the the same installation key.
      var installB = await clientB.installationPublicKey();
      expect(installA, installB);
    },
  );
}