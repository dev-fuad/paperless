package expo.modules.readsms

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.provider.Telephony
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import expo.modules.interfaces.permissions.Permissions
import expo.modules.kotlin.Promise
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

enum class ReadSMSStatus {
  SMS_READ,
  SUCCESS,
  ERROR,
}

class ReadSMSModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    val permission: String = Manifest.permission.READ_SMS
    val requestCode: Int = 1
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ReadSMS')` in JavaScript.
    Name("ReadSMS")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    Constants(
      "SMS_READ" to ReadSMSStatus.SMS_READ.name,
      "SUCCESS" to ReadSMSStatus.SUCCESS.name,
      "ERROR" to ReadSMSStatus.ERROR.name,
    )

    // Defines event names that the module can send to JavaScript.
    // Events("onRecieve")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    AsyncFunction("getMessages") { lastRead: String, promise: Promise ->
      if (ContextCompat.checkSelfPermission(context, permission)
            != PackageManager.PERMISSION_GRANTED
        ) {
        Permissions.askForPermissionsWithPermissionsManager(
          permissionsManager,
          promise,
          permission
        )
      } else {
        readSms(lastRead, promise)
      }
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    // AsyncFunction("setValueAsync") { value: String ->
    //   // Send an event to JavaScript.
    //   sendEvent("onRecieve", mapOf(
    //     "value" to value
    //   ))
    // }

    // Enables the module to be used as a native view. Definition components that are accepted as part of
    // the view definition: Prop, Events.
    // View(ReadSMSView::class) {
    //   // Defines a setter for the `name` prop.
    //   Prop("name") { view: ReadSMSView, prop: String ->
    //     println(prop)
    //   }
    // }

  }

  private val context
    get() = requireNotNull(appContext.reactContext)

  private val permissionsManager: Permissions
    get() = appContext.permissions ?: throw Exceptions.PermissionsModuleNotFound()

  private fun readSms(lastRead: String, promise: Promise) {

      val list: MutableList<Map<String, String>> = mutableListOf()

        val addressCol = Telephony.TextBasedSmsColumns.ADDRESS
        val textCol = Telephony.TextBasedSmsColumns.BODY
        val typeCol = Telephony.TextBasedSmsColumns.TYPE // 1 - Inbox, 2 - Sent
        val dateCol = Telephony.TextBasedSmsColumns.DATE
        val threadIdCol = Telephony.TextBasedSmsColumns.THREAD_ID

        val projection = arrayOf(addressCol, textCol, typeCol, dateCol, threadIdCol)

        val cursor = context.getContentResolver().query(
            Telephony.Sms.CONTENT_URI,
            projection, dateCol + " > ?", arrayOf(lastRead), null
        )

        val addressColIdx = cursor!!.getColumnIndex(addressCol)
        val textColIdx = cursor.getColumnIndex(textCol)
        val typeColIdx = cursor.getColumnIndex(typeCol)
        val dateColIdx = cursor.getColumnIndex(dateCol)
        val threadIdColIdx = cursor.getColumnIndex(threadIdCol)

        while (cursor.moveToNext()) {
          list.add(mapOf(
            "address" to cursor.getString(addressColIdx),
            "body" to cursor.getString(textColIdx),
            "type" to cursor.getString(typeColIdx),
            "date" to cursor.getLong(dateColIdx).toString(),
            "threadId" to cursor.getString(threadIdColIdx)
          ))
        }

        cursor.close()
        promise.resolve(list)
    }
}
