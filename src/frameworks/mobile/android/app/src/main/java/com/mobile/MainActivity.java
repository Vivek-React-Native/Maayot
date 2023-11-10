package com.maayot;
import io.branch.rnbranch.*;
import android.content.Intent;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
      protected void onStart() {
          super.onStart();
          RNBranchModule.initSession(getIntent().getData(), this);
      }

      @Override
      public void onNewIntent(Intent intent) {
          super.onNewIntent(intent);
        if (intent != null &&
              intent.hasExtra("branch_force_new_session") && 
              intent.getBooleanExtra("branch_force_new_session",false)) {
            RNBranchModule.onNewIntent(intent);
        }
      }

  @Override
  protected String getMainComponentName() {
    return "mobile";
  }
}
